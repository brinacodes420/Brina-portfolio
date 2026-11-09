
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

export interface WheelCarouselItem {
  label: string;
  image: string;
  imageAlt?: string;
}

export type WheelCarouselMode = "system" | "light" | "dark" | "custom";

export interface WheelCarouselProps {
  items?: WheelCarouselItem[];
  mode?: WheelCarouselMode;
  photoSide?: "left" | "right";
  photoWidth?: number;
  photoAspect?: "3/4" | "1/1" | "4/3" | "3/2";
  contentWidth?: number;
  gap?: number;
  photoRadius?: number;
  crossfadeDuration?: number;
  radius?: number;
  spacing?: number;
  visibleItems?: number;
  apexInset?: number;
  textColor?: string;
  selectedColor?: string;
  showMarker?: boolean;
  markerColor?: string;
  markerSize?: number;
  markerGap?: number;
  background?: string;
  panelColor?: string;
  scrollSpeed?: number;
  dragSpeed?: number;
  snap?: boolean;
  momentum?: boolean;
  appear?: boolean;
  edgeFade?: boolean;
  edgeFadeSize?: number;
  initialIndex?: number;
  activeIndex?: number;
  onActiveChange?: (item: WheelCarouselItem, index: number) => void;
  className?: string;
  photoClassName?: string;
  itemClassName?: string;
}

const defaultItems: WheelCarouselItem[] = [
  {
    label: "Brookwell Harmony School",
    image: "/images/projects/brookwell.jpg",
    imageAlt: "Brookwell Harmony School website project preview",
  },
  {
    label: "Project Two",
    image: "/images/projects/project-two.jpg",
    imageAlt: "Website project preview",
  },
  {
    label: "Project Three",
    image: "/images/projects/project-three.jpg",
    imageAlt: "Website project preview",
  },
];

const aspectRatios = {
  "3/4": "3 / 4",
  "1/1": "1 / 1",
  "4/3": "4 / 3",
  "3/2": "3 / 2",
} as const;

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

function shortestOffset(
  index: number,
  rotation: number,
  length: number,
) {
  let offset = index - rotation;

  while (offset > length / 2) offset -= length;
  while (offset < -length / 2) offset += length;

  return offset;
}

export function WheelCarousel({
  items = defaultItems,
  mode = "custom",
  photoSide = "left",
  photoWidth = 44,
  photoAspect = "3/4",
  contentWidth = 1100,
  gap = 32,
  photoRadius = 14,
  crossfadeDuration = 0.5,
  radius = 320,
  spacing = 14,
  visibleItems = 7,
  apexInset = 34,
  textColor = "rgba(247, 245, 239, 0.45)",
  selectedColor = "#F7F5EF",
  showMarker = true,
  markerColor = "#A6B5A0",
  markerSize = 10,
  markerGap = 16,
  background = "#050608",
  panelColor = "#111C19",
  scrollSpeed = 0.008,
  dragSpeed = 0.02,
  snap = true,
  momentum = true,
  appear = true,
  edgeFade = true,
  edgeFadeSize = 18,
  initialIndex = 0,
  activeIndex,
  onActiveChange,
  className,
  photoClassName,
  itemClassName,
}: WheelCarouselProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const instanceId = useId();

  const carouselItems = items.length ? items : defaultItems;
  const itemCount = carouselItems.length;
  const startingIndex = wrapIndex(activeIndex ?? initialIndex, itemCount);

  const [rotation, setRotation] = useState(startingIndex);
  const [selectedIndex, setSelectedIndex] = useState(startingIndex);
  const [isDragging, setIsDragging] = useState(false);
  const [systemDark, setSystemDark] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(startingIndex);
  const selectedRef = useRef(startingIndex);
  const appliedActiveIndexRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const draggingRef = useRef(false);

  const dragOriginRef = useRef({
    y: 0,
    rotation: startingIndex,
  });

  const previousDragRotationRef = useRef(startingIndex);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (mode !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => setSystemDark(media.matches);

    updateTheme();
    media.addEventListener("change", updateTheme);

    return () => media.removeEventListener("change", updateTheme);
  }, [mode]);

  const resolvedMode =
    mode === "system"
      ? systemDark
        ? "dark"
        : "light"
      : mode;

  const palette = useMemo(() => {
    if (resolvedMode === "dark") {
      return {
        background: "#050608",
        text: "rgba(247, 245, 239, 0.45)",
        selected: "#F7F5EF",
        marker: "#A6B5A0",
        panel: "#111C19",
      };
    }

    if (resolvedMode === "light") {
      return {
        background: "#F7F5EF",
        text: "rgba(32, 33, 30, 0.42)",
        selected: "#183D32",
        marker: "#183D32",
        panel: "#E5E2D9",
      };
    }

    return {
      background,
      text: textColor,
      selected: selectedColor,
      marker: markerColor,
      panel: panelColor ?? background,
    };
  }, [
    resolvedMode,
    background,
    textColor,
    selectedColor,
    markerColor,
    panelColor,
  ]);

  useEffect(() => {
    const normalizedIndex = wrapIndex(selectedRef.current, itemCount);

    if (normalizedIndex === selectedRef.current) return;

    selectedRef.current = normalizedIndex;
    rotationRef.current = normalizedIndex;

    setSelectedIndex(normalizedIndex);
    setRotation(normalizedIndex);
  }, [itemCount]);

  const commitRotation = useCallback(
    (nextRotation: number) => {
      rotationRef.current = nextRotation;
      setRotation(nextRotation);

      const nextIndex = wrapIndex(
        Math.round(nextRotation),
        itemCount,
      );

      if (nextIndex !== selectedRef.current) {
        selectedRef.current = nextIndex;
        setSelectedIndex(nextIndex);
        onActiveChange?.(carouselItems[nextIndex]!, nextIndex);
      }
    },
    [carouselItems, itemCount, onActiveChange],
  );

  const commitRotationRef = useRef(commitRotation);
  commitRotationRef.current = commitRotation;

  const runAnimation = useCallback(() => {
    if (frameRef.current !== null) return;

    const tick = () => {
      let keepAnimating = false;

      if (
        !draggingRef.current &&
        Math.abs(velocityRef.current) > 0.0008
      ) {
        commitRotation(rotationRef.current + velocityRef.current);

        velocityRef.current *=
          momentum && !reduceMotion
            ? snap
              ? 0.9
              : 0.94
            : 0.8;

        keepAnimating = true;
      } else if (!draggingRef.current && snap) {
        velocityRef.current = 0;

        const target = Math.round(rotationRef.current);
        const delta = target - rotationRef.current;

        if (Math.abs(delta) > 0.001 && !reduceMotion) {
          commitRotation(rotationRef.current + delta * 0.22);
          keepAnimating = true;
        } else {
          commitRotation(target);
        }
      } else if (!draggingRef.current) {
        velocityRef.current = 0;
      }

      if (keepAnimating) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [commitRotation, momentum, reduceMotion, snap]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;

      event.preventDefault();

      const delta = event.deltaY * scrollSpeed;

      commitRotation(rotationRef.current + delta);
      velocityRef.current = delta * 0.2;

      runAnimation();
    };

    stage.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => stage.removeEventListener("wheel", handleWheel);
  }, [commitRotation, runAnimation, scrollSpeed]);

  useEffect(() => {
    if (activeIndex === undefined) return;

    const controlledIndex = wrapIndex(activeIndex, itemCount);

    if (appliedActiveIndexRef.current === controlledIndex) return;

    appliedActiveIndexRef.current = controlledIndex;

    const currentIndex = wrapIndex(
      Math.round(rotationRef.current),
      itemCount,
    );

    let delta = controlledIndex - currentIndex;

    if (delta > itemCount / 2) delta -= itemCount;
    if (delta < -itemCount / 2) delta += itemCount;

    selectedRef.current = controlledIndex;
    setSelectedIndex(controlledIndex);

    commitRotationRef.current(rotationRef.current + delta);
  }, [activeIndex, itemCount]);

  const moveBy = (amount: number) => {
    velocityRef.current = 0;
    commitRotation(rotationRef.current + amount);
    runAnimation();
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!event.isPrimary || event.button !== 0) return;

    draggingRef.current = true;
    setIsDragging(true);
    velocityRef.current = 0;

    dragOriginRef.current = {
      y: event.clientY,
      rotation: rotationRef.current,
    };

    previousDragRotationRef.current = rotationRef.current;

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingRef.current) return;

    const distance =
      event.clientY - dragOriginRef.current.y;

    const nextRotation =
      dragOriginRef.current.rotation - distance * dragSpeed;

    velocityRef.current =
      nextRotation - previousDragRotationRef.current;

    previousDragRotationRef.current = nextRotation;

    commitRotation(nextRotation);
  };

  const handlePointerEnd = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingRef.current) return;

    draggingRef.current = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    runAnimation();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault();
      moveBy(1);
    }

    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowLeft"
    ) {
      event.preventDefault();
      moveBy(-1);
    }

    if (event.key === "Home") {
      event.preventDefault();
      velocityRef.current = 0;
      commitRotation(rotationRef.current - selectedIndex);
      runAnimation();
    }

    if (event.key === "End") {
      event.preventDefault();
      velocityRef.current = 0;

      const lastIndex = itemCount - 1;

      commitRotation(
        rotationRef.current + lastIndex - selectedIndex,
      );

      runAnimation();
    }
  };

  const safeSelectedIndex = wrapIndex(selectedIndex, itemCount);
  const selectedItem = carouselItems[safeSelectedIndex]!;

  const mask = edgeFade
    ? `linear-gradient(to bottom, transparent 0%, black ${edgeFadeSize}%, black ${100 - edgeFadeSize}%, transparent 100%)`
    : undefined;

  const rootStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    minHeight: 420,
    overflow: "hidden",
    backgroundColor: palette.background,
    color: palette.selected,
  };

  const stageStyle: CSSProperties = {
    display: "flex",
    flexDirection: photoSide === "right" ? "row-reverse" : "row",
    alignItems: "stretch",
    width: "100%",
    height: "100%",
    maxWidth: contentWidth,
    gap,
    overflow: "hidden",
    outline: "none",
    touchAction: "none",
    userSelect: "none",
    cursor: isDragging ? "grabbing" : "grab",
  };

  const photoColumnStyle: CSSProperties = {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    width: `${photoWidth}%`,
    backgroundColor: palette.background,
  };

  const photoStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxHeight: "100%",
    aspectRatio: aspectRatios[photoAspect],
    overflow: "hidden",
    borderRadius: photoRadius,
    backgroundColor: palette.panel,
  };

  const labelsStyle: CSSProperties = {
    position: "relative",
    flex: 1,
    minWidth: 0,
    height: "100%",
    overflow: "hidden",
    maskImage: mask,
    WebkitMaskImage: mask,
  };

  return (
    <motion.div
      className={className}
      initial={
        appear && !reduceMotion
          ? { opacity: 0, y: 18 }
          : false
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={rootStyle}
    >
      <div
        ref={stageRef}
        role="listbox"
        aria-label="Selected projects"
        aria-activedescendant={`${instanceId}-item-${safeSelectedIndex}`}
        tabIndex={0}
        style={stageStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={handleKeyDown}
      >
        <div style={photoColumnStyle}>
          <div
            className={photoClassName}
            style={photoStyle}
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.img
                key={`${safeSelectedIndex}-${selectedItem.image}`}
                src={selectedItem.image}
                alt={selectedItem.imageAlt ?? selectedItem.label}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, scale: 1.04 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : crossfadeDuration,
                }}
                draggable={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </AnimatePresence>
          </div>
        </div>

        <div style={labelsStyle}>
          {showMarker && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "50%",
                left: `calc(${apexInset}% - ${markerGap}px)`,
                zIndex: 2,
                width: markerSize,
                height: markerSize,
                marginLeft: -markerSize,
                borderRadius: "50%",
                transform: "translateY(-50%)",
                backgroundColor: palette.marker,
              }}
            />
          )}

          {carouselItems.map((item, index) => {
            const offset = shortestOffset(
              index,
              rotation,
              itemCount,
            );

            if (Math.abs(offset) > visibleItems + 1) {
              return null;
            }

            const angle = offset * spacing;
            const radians = (angle * Math.PI) / 180;
            const x = -radius * (1 - Math.cos(radians));
            const y = radius * Math.sin(radians);

            const distance = Math.min(
              Math.abs(offset) / visibleItems,
              1,
            );

            const opacity = Math.cos(
              (distance * Math.PI) / 2,
            );

            const scale =
              1 - Math.min(Math.abs(offset) * 0.04, 0.45);

            const selected = Math.abs(offset) < 0.5;

            const labelStyle: CSSProperties = {
              position: "absolute",
              top: "50%",
              left: `${apexInset}%`,
              transformOrigin: "left center",
              whiteSpace: "nowrap",
              fontSize: "clamp(1rem, 2.4vw, 1.625rem)",
              fontWeight: selected ? 600 : 500,
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: selected
                ? palette.selected
                : palette.text,
              opacity,
              transform: `translate(${x}px, ${y}px) translateY(-50%) rotate(${angle}deg) scale(${scale})`,
              pointerEvents: "none",
            };

            return (
              <div
                id={`${instanceId}-item-${index}`}
                key={`${item.label}-${index}`}
                role="option"
                aria-selected={selected}
                className={itemClassName}
                style={labelStyle}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>

      <span
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
        aria-live="polite"
      >
        {selectedItem.label}, item {safeSelectedIndex + 1} of{" "}
        {itemCount}
      </span>
    </motion.div>
  );
}

export default WheelCarousel;
