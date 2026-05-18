"use client";

import { motion } from "framer-motion";
import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const PageWrapper = ({ children, title, subtitle }: PageWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen pt-24 pb-12 px-6 max-w-7xl mx-auto w-full"
    >
      {title && (
        <div className="mb-16 text-center md:text-left">
          <div className="text-cyan-500 font-mono text-xs uppercase tracking-widest mb-2">
            // {title}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white font-syne leading-tight">
            {title} <span className="text-cyan-500">.</span>
          </h1>
          {subtitle && (
            <p className="text-gray-400 mt-4 text-lg max-w-2xl font-light">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="relative">
        {children}
      </div>
    </motion.div>
  );
};
