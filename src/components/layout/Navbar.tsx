"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { IonIcon } from '@/components/ui/IonIcon';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { PWAInstallModal } from '@/components/ui/PWAInstallModal';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Sidebar } from './Sidebar';

export const Navbar = () => {
  const { user, logout, setIsAuthOpen, setIsLogin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isIOSModalOpen, setIsIOSModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handlePWAInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
      setIsIOSModalOpen(true);
    } else {
      alert('PWA installation is supported in your browser. Look for the install prompt in the address bar!');
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[1000] px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-white/5 dark:bg-obsidian/20 border-b border-white/10 transition-all duration-500 h-16">
        {/* Left: Hamburger */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 group relative z-50"
          >
            <motion.div
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 7 : 0,
                backgroundColor: isMenuOpen ? '#00d4ff' : (theme === 'dark' ? 'white' : '#000'),
              }}
              className="h-0.5 w-7 bg-current rounded-full transition-all"
            />
            <motion.div
              animate={{
                opacity: isMenuOpen ? 0 : 1,
                x: isMenuOpen ? 10 : 0
              }}
              className="h-0.5 w-7 bg-current rounded-full"
            />
            <motion.div
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -7 : 0,
                backgroundColor: isMenuOpen ? '#00d4ff' : (theme === 'dark' ? 'white' : '#000'),
              }}
              className="h-0.5 w-7 bg-current rounded-full transition-all"
            />
          </button>
        </div>

        {/* Center: Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold tracking-tighter text-cyan-500"
        >
          AM<span className="text-white/50">.</span>DEV
        </motion.div>

        {/* Right: Theme Toggle + Sign In */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all group"
            title="Toggle Theme"
          >
            <IonIcon
              name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
              className="text-xl text-white transition-transform group-hover:rotate-12"
            />
          </button>

          {user ? (
            <div className="relative">
              <UserAvatar user={user} onClick={() => setIsProfileOpen(!isProfileOpen)} />
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-white/70 dark:bg-obsidian/80 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-premium overflow-hidden p-2"
                  >
                    <div className="px-4 py-3 border-b border-white/10 mb-2">
                      <p className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-[0.2em] mb-1">Account</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{user.email}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {[
                        { name: 'Profile', icon: 'person-outline' },
                        { name: 'Dashboard', icon: 'grid-outline' },
                        { name: 'Settings', icon: 'settings-outline' },
                      ].map((item) => (
                        <button
                          key={item.name}
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-cyan-500/10 hover:text-cyan-500 rounded-lg transition-all duration-200 group"
                        >
                          <IonIcon name={item.icon} className="text-lg group-hover:scale-110 transition-transform" />
                          {item.name}
                        </button>
                      ))}
                      <div className="my-1 border-t border-white/10" />
                      <button
                        onClick={logout}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group"
                      >
                        <IonIcon name="log-out-outline" className="text-lg group-hover:translate-x-1 transition-transform" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => { setIsLogin(true); setIsAuthOpen(true); }}
              className="relative px-6 py-2 text-sm font-bold text-cyan-400 border-2 border-cyan-400 rounded-full overflow-hidden transition-all group"
            >
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Sign In</span>
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          )}
        </div>
      </nav>

      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <PWAInstallModal isOpen={isIOSModalOpen} onClose={() => setIsIOSModalOpen(false)} />
    </>
  );
};
