"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfilePortraitProps {
  variant?: 'hero' | 'about';
}

export const ProfilePortrait = ({ variant = 'hero' }: ProfilePortraitProps) => {
  const isHero = variant === 'hero';

  return (
    <motion.div
      className={`profile-portrait-container ${variant}`}
      initial={{ opacity: 0, x: isHero ? 50 : 0, y: isHero ? 0 : 50, rotate: isHero ? 5 : -5 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -15, 0],
        rotate: 0
      }}
      transition={{
        opacity: { duration: 1 },
        x: { duration: 1 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        rotate: { duration: 1 }
      }}
    >
      <div className="portrait-glow" />
      <div className="portrait-frame">
        <Image src="/images/gallery/photo-01.avif" alt="Abdihakim Mohamed" fill style={{ objectFit: 'cover' }} priority />
      </div>

    </motion.div>
  );
};
