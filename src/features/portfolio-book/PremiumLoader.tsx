"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumLoaderProps {
  onComplete: () => void;
}

export const PremiumLoader = ({ onComplete }: PremiumLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05070a] text-white"
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-64 h-64 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
        />

        {/* Secondary Inner Ring */}
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute w-48 h-48 rounded-full border-2 border-cyan-500/10 border-b-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        />

        {/* Center Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl font-bold tracking-tighter text-cyan-500 font-syne"
          >
            AM<span className="text-white/50">.</span>DEV
          </motion.div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="font-mono text-xs text-cyan-500/60 tracking-widest uppercase">
              Initializing System {progress}%
            </span>
          </div>
        </div>
      </div>

      {/* Background subtle particles/glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-600/10 blur-[120px] rounded-full" />
      </div>
    </motion.div>
  );
};
