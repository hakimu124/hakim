"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IonIcon } from './IonIcon';

interface RadialSelectorProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const MENU_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home-outline', section: 'top' },
  { id: 'about', label: 'About', icon: 'person-outline', section: 'about' },
  { id: 'skills', label: 'Skills', icon: 'code-working-outline', section: 'experience' },
  { id: 'projects', label: 'Projects', icon: 'briefcase-outline', section: 'projects' },
  { id: 'contact', label: 'Contact', icon: 'mail-outline', section: 'contact' },
  { id: 'theme', label: 'Theme', icon: 'moon-outline', section: 'theme' },
];

export const RadialSelector = ({ theme, toggleTheme }: RadialSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (item: typeof MENU_ITEMS[0], index: number) => {
    setActiveIndex(index);
    setIsOpen(false);

    if (item.section === 'theme') {
      toggleTheme();
    } else if (item.section === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(item.section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="radial-selector-container">
      <div
        className={`radial-knob ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IonIcon name="menu-outline"></IonIcon>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="radial-menu"
            initial={{ opacity: 0, scale: 0, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: -45 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {MENU_ITEMS.map((item, index) => (
              <li
                key={item.id}
                style={{
                  transform: `rotate(${index * 60}deg) translate(120px)`
                }}
                onClick={() => handleItemClick(item, index)}
              >
                <div className="radial-item">
                  <IonIcon name={item.icon}></IonIcon>
                  <span className="radial-label">{item.label}</span>
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
