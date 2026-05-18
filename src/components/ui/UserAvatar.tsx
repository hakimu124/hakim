"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface UserAvatarProps {
  user: { email: string; name?: string };
  onClick: () => void;
}

export const UserAvatar = ({ user, onClick }: UserAvatarProps) => {
  const getInitials = (email: string) => {
    const name = user.name || email.split('@')[0];
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0].toUpperCase()}${parts[parts.length - 1][0].toUpperCase()}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="relative w-10 h-10 rounded-full p-0.5 group shadow-gold-premium"
    >
      {/* Radial Glow Background */}
      <div className="absolute inset-0 bg-gold/20 blur-lg rounded-full transition-opacity opacity-0 group-hover:opacity-100" />

      {/* Shimmering Rotating Border */}
      <div className="absolute inset-0 rounded-full p-0.5 bg-gradient-to-tr from-gold via-yellow-200 to-gold animate-spin-slow" style={{ animationDuration: '3s' }} />

      <div className="relative w-full h-full rounded-full bg-obsidian/90 backdrop-blur-md flex items-center justify-center border border-white/10 overflow-hidden z-10">
        <span className="text-xs font-bold text-gold tracking-tighter">
          {getInitials(user.email)}
        </span>
      </div>
    </motion.button>
  );
};
