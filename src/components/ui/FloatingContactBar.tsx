"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { IonIcon } from './IonIcon';

export const FloatingContactBar = () => {
  const contacts = [
    { label: 'WhatsApp', icon: 'logo-whatsapp', href: 'https://wa.me/254722287517', color: '#25D366' },
    { label: 'Email', icon: 'mail-outline', href: 'mailto:abdihakma0@gmail.com', color: '#EA4335' },
    { label: 'GitHub', icon: 'logo-github', href: 'https://github.com/abdihakim', color: '#333' },
    { label: 'LinkedIn', icon: 'logo-linkedin', href: 'https://linkedin.com/in/abdihakim', color: '#0077B5' },
  ];

  return (
    <div className="floating-contact-bar">
      {contacts.map((contact, i) => (
        <motion.a
          key={contact.label}
          href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-bubble"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.2, x: -5 }}
        >
          <IonIcon name={contact.icon} style={{ color: contact.color }}></IonIcon>
          <span className="bubble-label">{contact.label}</span>
        </motion.a>
      ))}
    </div>
  );

};
