"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { IonIcon } from '@/components/ui/IonIcon';
import Image from 'next/image';

const IMAGES = [
  '/images/gallery/photo-01.avif',
  '/images/gallery/photo-03.avif',
  '/images/gallery/photo-04.avif',
  '/images/gallery/photo-06.avif',
];

export const VisualGallery = () => {
  return (
    <section className="section-premium" id="gallery" style={{ padding: '100px 0', overflow: 'hidden' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="section-label">Visual Journey</div>
        <h2 className="premium-title">Moments & Perspective</h2>
        <p className="premium-text" style={{ maxWidth: '600px', margin: '0 auto' }}>
          A glimpse into my world beyond the code — exploring the intersection of art, life, and technology.
        </p>
      </div>

      <div className="gallery-grid">
        {IMAGES.map((src, i) => (
          <motion.div
            key={i}
            className="gallery-item reveal"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotateY: 10, rotateX: -10 }}
            style={{
              perspective: '1000px',
              cursor: 'pointer'
            }}
          >
            <div className="gallery-card">
              <Image src={src} alt={`Gallery photo ${i + 1}`} fill style={{ objectFit: 'cover' }} />
              <div className="gallery-overlay">
                <div className="gallery-info">
                  <span>Visual 0{i + 1}</span>
                  <IonIcon name="expand-outline"></IonIcon>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
