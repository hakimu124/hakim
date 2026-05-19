"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { IonIcon } from '@/components/ui/IonIcon';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal = ({ isOpen, onClose }: PWAInstallModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-white/10 dark:bg-obsidian/80 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-yellow-400 to-gold" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <IonIcon name="close-outline" className="text-2xl" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <IonIcon name="download-outline" className="text-4xl text-gold" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Install on iOS</h3>
          <p className="text-white/60 text-sm mb-8">
            Experience the full premium interface by adding our app to your home screen.
          </p>

          <div className="space-y-6 w-full text-left">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-bold text-sm">1</div>
              <p className="text-white/80 text-sm">Tap the <span className="text-gold font-medium">Share</span> button at the bottom of your screen.</p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-bold text-sm">2</div>
              <p className="text-white/80 text-sm">Scroll down and select <span className="text-gold font-medium">&quot;Add to Home Screen&quot;</span>.</p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all">
              <div className="w-8 h-8 rounded-full bg-gold text-obsidian flex items-center justify-center font-bold text-sm">3</div>
              <p className="text-white/80 text-sm">Tap <span className="text-gold font-medium">&quot;Add&quot;</span> in the top right corner.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-4 bg-gold text-obsidian rounded-2xl font-bold text-lg shadow-xl shadow-gold/20 hover:bg-yellow-400 transition-all"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </div>
  );
};
