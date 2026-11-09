
import React, {
  cloneElement,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type NavItem = {
  id: string;
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: NavItem[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
};

export function LimelightNav({
  items,
  activeIndex,
  onTabChange,
  className = "",
}: LimelightNavProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const selectedIndex = activeIndex ?? internalIndex;

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const activeItem = itemRefs.current[selectedIndex];
    const light = lightRef.current;

    if (!activeItem || !light) return;

    light.style.left = `${
      activeItem.offsetLeft +
      activeItem.offsetWidth / 2 -
      light.offsetWidth / 2
    }px`;

    setReady(true);
  }, [selectedIndex, items.length]);

  const handleSelect = (index: number, item: NavItem) => {
    if (activeIndex === undefined) {
      setInternalIndex(index);
    }

    onTabChange?.(index);
    item.onClick?.();
  };

  if (!items.length) return null;

  return (
    <nav
      aria-label="Main navigation"
      className={`limelight-nav ${className}`}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(element) => {
            itemRefs.current[index] = element;
          }}
          type="button"
          aria-label={item.label}
          aria-current={selectedIndex === index ? "page" : undefined}
          onClick={() => handleSelect(index, item)}
          className={`limelight-nav__item ${
            selectedIndex === index ? "is-active" : ""
          }`}
        >
          {cloneElement(item.icon, {
            className: "limelight-nav__icon",
            "aria-hidden": true,
          })}
          <span className="limelight-nav__label">{item.label}</span>
        </button>
      ))}

      <div
        ref={lightRef}
        aria-hidden="true"
        className={`limelight-nav__light ${
          ready ? "is-ready" : ""
        }`}
      >
        <div className="limelight-nav__glow" />
      </div>
    </nav>
  );
}

export type { NavItem };
