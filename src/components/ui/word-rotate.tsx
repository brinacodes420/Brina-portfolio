
import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface WordRotateProps {
  words: string[];
  duration?: number;
  className?: string;
}

export function WordRotate({
  words,
  className = "",
  duration = 3500,
}: WordRotateProps) {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    if (!words.length) return;

    const timeoutId = window.setTimeout(() => {
      setIndex((current) => (current + 1) % words.length);
    }, duration);

    return () => window.clearTimeout(timeoutId);
  }, [index, words, duration]);

  if (!words.length) return null;

  return (
    <div className="overflow-hidden p-2" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -35 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={className}
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
