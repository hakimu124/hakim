"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Moon, Sun, Home, Briefcase, User, MessageSquare, FileText, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'About', href: '/about', icon: User },
    { name: 'How We Work', href: '/how-we-work', icon: MessageSquare },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-[1400] bg-black/60 backdrop-blur-md transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 left-0 h-full w-80 bg-[#05070a] text-white z-[1500] transition-transform duration-500 ease-out border-r border-cyan-500/30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-[10px_0_30px_rgba(0,0,0,0.5)]`}>
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-xl shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all">
                AM
              </div>
              <div className="transition-transform group-hover:translate-x-1 duration-300">
                <h3 className="font-syne font-bold text-lg leading-none text-white">Abdihakim Mohamed</h3>
                <span className="text-cyan-500/60 text-xs font-mono tracking-tighter uppercase">Cybersecurity Engineer</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-cyan-500/10 transition-all">
              <span className="text-2xl">✕</span>
            </button>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name} className="relative group">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? 'text-cyan-400 bg-cyan-500/10'
                          : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-500/5'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNavLink"
                          className="absolute inset-0 rounded-xl border border-cyan-500/50 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      <link.icon className={`w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-300'}`} />
                      <span className={`relative z-10 font-mono text-sm transition-colors ${isActive ? 'text-cyan-400 font-medium' : 'group-hover:text-cyan-300'}`}>
                        {link.name}
                      </span>

                      <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,1)]" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto pt-8 border-t border-cyan-500/20 space-y-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-4 w-full p-4 rounded-xl text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all group"
            >
              <div className="p-1 rounded-lg group-hover:rotate-12 transition-transform duration-300">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </div>
              <span className="font-mono text-sm transition-colors group-hover:text-cyan-400">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <Link
              href="/cv.pdf"
              target="_blank"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full p-4 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] group"
            >
              Download CV
              <span className="group-hover:translate-x-1 transition-transform">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
