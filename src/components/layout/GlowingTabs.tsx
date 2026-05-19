"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const TABS = [
  { name: 'Home', href: '#home' },
  { name: 'Project', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'How we work', href: '#process' },
];

export const GlowingTabs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex gap-2 p-2 bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
      } as any} // eslint-disable-line @typescript-eslint/no-explicit-any
    >
      {TABS.map((tab) => (
        <motion.a
          key={tab.name}
          href={tab.href}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-2 rounded-full text-sm font-mono text-white/60 hover:text-cyan-400 transition-colors group overflow-hidden"
        >
          <span className="relative z-10">{tab.name}</span>
          <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      ))}

      {/* Mouse-following glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 100px at var(--mouse-x) var(--mouse-y), rgba(0, 212, 255, 0.15), transparent)`,
        }}
      />
    </div>
  );
};
