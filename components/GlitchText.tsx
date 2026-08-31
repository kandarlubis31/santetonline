"use client";

import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "h1",
}: GlitchTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Tag
        className={`relative inline-block ${className}`}
        data-text={text}
      >
        {text}
        <span
          className="absolute top-0 left-0 w-full h-full opacity-70 animate-glitch-text pointer-events-none"
          aria-hidden="true"
        >
          {text}
        </span>
      </Tag>
    </motion.div>
  );
}
