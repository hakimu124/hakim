"use client";
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './AbdihakimStyles.css';
import { PremiumLoader } from './PremiumLoader';
import { Hero3D } from '../hero/Hero3D';
import { ProfilePortrait } from '../hero/ProfilePortrait';
import { VisualGallery } from '../hero/VisualGallery';
import { PortfolioBook } from './PortfolioBook';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { FloatingContactBar } from '@/components/ui/FloatingContactBar';
import { IonIcon } from '@/components/ui/IonIcon';
import { SolarSystemExplorer } from '../solar-system/SolarSystemExplorer';
import { GlowingTabs } from '@/components/layout/GlowingTabs';

gsap.registerPlugin(ScrollTrigger);

const TYPEWRITER_TEXTS = [
  "Full-Stack Developer",
  "UI/UX Designer",
  "3D Animator",
  "Kenya 🇰🇪"
];

const ThreeDPhone = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const angleValRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current || !angleValRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxDist = Math.min(window.innerWidth, window.innerHeight) * 0.45;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const normDist = Math.min(dist / maxDist, 1);
      const maxTilt = 40;
      const targetRy = (dx / maxDist) * maxTilt;
      const targetRx = -(dy / maxDist) * maxTilt;
      const clampedRy = Math.max(-maxTilt, Math.min(maxTilt, targetRy));
      const clampedRx = Math.max(-maxTilt, Math.min(maxTilt, targetRx));
      phoneRef.current.style.transform = `rotateX(${clampedRx}deg) rotateY(${clampedRy}deg)`;
      const angle = Math.round(normDist * 85);
      angleValRef.current.textContent = `${angle}°`;
      const privOpacity = Math.pow(normDist, 1.3) * 0.95;
      phoneRef.current.style.setProperty('--priv-opacity', privOpacity.toString());
    };

    const handleMouseLeave = () => {
      if (!phoneRef.current || !angleValRef.current) return;
      phoneRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
      angleValRef.current.textContent = '0°';
      phoneRef.current.style.setProperty('--priv-opacity', '0');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="scene-3d">
      <div className="phone-3d" ref={phoneRef}>
        <div className="phone-back" />
        <div className="phone-edge edge-l" />
        <div className="phone-edge edge-r" />
        <div className="phone-edge edge-t" />
        <div className="phone-edge edge-b" />
        <div className="phone-bezel">
          <div className="phone-inner">
            <div className="phone-screen">
              <div className="phone-wallpaper" />
              <div className="phone-status-bar">
                <span className="time">12:45</span>
                <div className="status-icons">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <rect x="0" y="7" width="2.5" height="3" rx="0.5" fill="rgba(255,255,255,0.9)" />
                    <rect x="3.8" y="5" width="2.5" height="5" rx="0.5" fill="rgba(255,255,255,0.9)" />
                    <rect x="7.6" y="2.5" width="2.5" height="7.5" rx="0.5" fill="rgba(255,255,255,0.9)" />
                    <rect x="11.4" y="0" width="2.5" height="10" rx="0.5" fill="rgba(255,255,255,0.9)" />
                  </svg>
                </div>
              </div>
              <div className="phone-notification">
                <div className="notif-header">
                  <div className="notif-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                  </div>
                  <span className="notif-app">Messages</span>
                </div>
                <div className="notif-title">Abdihakim</div>
                <div className="notif-body">Check out the premium build! 🔥</div>
              </div>
              <div className="phone-dock">
                <div className="dock-icon" style={{background: 'linear-gradient(145deg, #34d058, #22a847)'}} />
                <div className="dock-icon" style={{background: 'linear-gradient(145deg, #5b7cf7, #3b5ce4)'}} />
                <div className="dock-icon" style={{background: 'linear-gradient(145deg, #ea4335, #dd3327)'}} />
                <div className="dock-icon" style={{background: 'linear-gradient(145deg, #f5a623, #e8931a)'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel-3d">
        <div className="panel-title">Privacy Display</div>
        <div className="panel-sub">Creative Dev Edition</div>
        <div className="angle-readout">Viewing angle <span className="angle-val" ref={angleValRef}>0°</span></div>
      </div>
    </div>
  );
};

export const AbdihakimLandingPage = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const isActiveLink = (href: string) => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === href;
  };

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % TYPEWRITER_TEXTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.from('.title-line', {
      yPercent: 110,
      stagger: 0.12,
      duration: 1,
      ease: 'power4.out',
    });

    document.querySelectorAll('.reveal').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    });
  }, []);

  return (
    <div data-theme={theme} className="abdihakim-container" style={{'--charcoal': theme === 'dark' ? '#F5F0E8' : '#1A1814'} as any /* eslint-disable-line @typescript-eslint/no-explicit-any */}>
      <MagneticCursor />
      <FloatingContactBar />
      <GlowingTabs />

      {isLoading && (
        <PremiumLoader onComplete={handleLoaderComplete} />
      )}

      <section className="hero-section" id="home">
        <Hero3D />
        <div className="hero-floating-photos" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {[
            { src: "/images/gallery/photo-01.avif", pos: { left: '10%', top: '20%' }, size: 140, duration: 6, delay: 0 },
            { src: "/images/gallery/photo-03.avif", pos: { left: '75%', top: '35%' }, size: 120, duration: 8, delay: 1 },
            { src: "/images/gallery/photo-04.avif", pos: { left: '15%', top: '55%' }, size: 130, duration: 7, delay: 2 },
            { src: "/images/gallery/photo-06.avif", pos: { left: '65%', top: '70%' }, size: 110, duration: 9, delay: 3 },
          ].map((photo, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
              animate={{
                y: [0, -20, 0, 20, 0],
                x: [0, 10, 0, -10, 0],
                rotate: [0, 5, 0, -5, 0],
                opacity: 1
              }}
              transition={{
                duration: photo.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: photo.delay
              }}
              style={{
                position: 'absolute',
                ...photo.pos,
                width: photo.size,
                height: photo.size * 1.3,
                zIndex: 1,
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 212, 255, 0.5)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3), inset 0 0 15px rgba(0, 212, 255, 0.2)',
                backgroundColor: '#000'
              }}>
                <img
                  src={photo.src}
                  alt={`Floating photo ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.1) brightness(0.9) saturate(0.8)',
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.3) 0%, transparent 40%, transparent 60%, rgba(0, 212, 255, 0.3) 100%)',
                  pointerEvents: 'none'
                }} />
                <div style={{ position: 'absolute', top: 5, left: 5, width: 10, height: 10, borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
                <div style={{ position: 'absolute', top: 5, right: 5, width: 10, height: 10, borderTop: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />
                <div style={{ position: 'absolute', bottom: 5, left: 5, width: 10, height: 10, borderBottom: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
                <div style={{ position: 'absolute', bottom: 5, right: 5, width: 10, height: 10, borderBottom: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="hero-bg-grid" />
        <div className="hero-number">01</div>
        <div className="hero-index reveal">
          <span className="typewriter-container">
            {TYPEWRITER_TEXTS[textIndex]}
          </span>
        </div>
        <div className="hero-title">
          <div className="overflow-hidden"><span className="title-line block">Abdihakim</span></div>
          <div className="overflow-hidden"><span className="title-line block"><em className="serif-word">Mohamed</em></span></div>
          <div className="overflow-hidden"><span className="title-line block outline-text">N.</span></div>
        </div>
        <div className="hero-bottom reveal">
          <div className="hero-desc">
            Building digital experiences<br />
            that live at the intersection of<br />
            <strong style={{color: 'var(--charcoal)'}}>code, craft &amp; creativity.</strong>
          </div>
          <div className="hero-cta-group" style={{display: 'flex', gap: '15px', marginTop: '20px', alignItems: 'center'}}>
            <motion.a
              href="#contact"
              className="nav-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >Get In Touch</motion.a>
          </div>
          <div className="hero-availability">
            <div className="hero-dot" />
            Available for freelance projects
          </div>
        </div>
      </section>

      <section className="section-premium" id="about">
        <div className="about-grid">
          <div className="about-left reveal">
            <div className="section-label">About Me</div>
            <h2 className="premium-title">
              Crafting<br />
              <em style={{color: 'var(--accent)'}}>beautiful</em><br />
              digital worlds
            </h2>
            <p className="premium-text">
              I&apos;m Abdihakim Mohamed — a passionate full-stack developer based in Eldoret, Kenya, crafting high-performance digital experiences with modern web technologies and 3D design. I build things people remember, not just use.
            </p>
            <div className="stats-grid-premium">
              <div className="stat-box-premium">
                <div className="stat-num-premium">5+</div>
                <div className="stat-label-premium">Years Building</div>
              </div>
              <div className="stat-box-premium">
                <div className="stat-num-premium">50+</div>
                <div className="stat-label-premium">Projects Shipped</div>
              </div>
            </div>
          </div>
          <div className="about-right reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
            <ProfilePortrait variant="about" />
            <ThreeDPhone />
          </div>
        </div>
      </section>

      <section className="section-premium" id="skills-detailed">
        <div className="reveal" style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div className="section-label">My Arsenal</div>
          <h2 className="premium-title">Technical Mastery</h2>
        </div>
        <div className="skills-grid-premium" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          {[
            { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP', 'Framer Motion'], color: '#00abf0' },
            { category: 'Backend', skills: ['Node.js', 'PHP', 'Python', 'MongoDB', 'PostgreSQL', 'Redis', 'FastAPI'], color: '#4CAF50' },
            { category: 'Design', skills: ['Figma', 'Adobe XD', 'UI/UX Design', '3D Modeling', 'Blender', 'Prototyping'], color: '#E91E63' },
          ].map((cat, i) => (
            <motion.div
              key={i}
              className="skill-card-premium reveal shadow-premium"
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: 'var(--ivory)',
                padding: '30px',
                borderRadius: '20px',
                border: '1px solid var(--line)',
              }}
            >
              <h3 style={{color: cat.color, marginBottom: '20px', fontSize: '20px', fontWeight: 700}}>{cat.category}</h3>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                {cat.skills.map(skill => (
                  <span key={skill} style={{
                    padding: '6px 12px',
                    background: 'var(--charcoal)',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 500
                  }}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-premium reveal">
        <div className="section-label">Cosmic Exploration</div>
        <h2 className="premium-title" style={{textAlign: 'center', marginBottom: '2rem'}}>Our Solar System</h2>
        <SolarSystemExplorer />
      </section>

      <section className="section-premium" id="projects">
        <div className="projects-premium-header">
          <div className="reveal">
            <div className="section-label">Selected Work</div>
            <h2 className="projects-premium-title">Projects<br /><span style={{fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic', color: 'var(--accent)'}}>&amp; Case Studies</span></h2>
          </div>
        </div>
        <div className="projects-list">
          {[
            { name: 'NexCommerce', desc: 'Full-stack e-commerce platform with AI recommendations', tech: ['Next.js', 'Stripe', 'MongoDB'] },
            { name: 'Lumina Dashboard', desc: 'Real-time analytics dashboard with live WebSocket data', tech: ['React', 'D3.js', 'WebSocket'] },
            { name: 'PixelForge Studio', desc: 'Browser-based creative suite for generative art', tech: ['Canvas API', 'WebGL', 'GSAP'] },
            { name: 'Cogni AI Chat', desc: 'Conversational AI platform with multi-model routing', tech: ['Python', 'FastAPI', 'OpenAI'] },
            { name: 'ThreadNest', desc: 'Social platform for developers with code sharing', tech: ['Node.js', 'Socket.io', 'Redis'] },
            { name: 'VaultChain', desc: 'Decentralized file storage with blockchain verification', tech: ['Solidity', 'IPFS', 'Web3.js'] },
          ].map((proj, i) => (
            <div key={i} className="project-item-premium reveal" onMouseMove={(e) => {
              const { currentTarget } = e;
              const rect = currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              currentTarget.style.transform = `perspective(1000px) rotateX(${-y * 20}deg) rotateY(${x * 20}deg)`;
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            }}>
              <div className="project-num-premium">{String(i+1).padStart(2, '0')}</div>
              <div className="project-info">
                <div className="project-name-premium">{proj.name}</div>
                <div className="premium-text" style={{fontSize: '12px', margin: '4px 0'}}>{proj.desc}</div>
              </div>
              <div className="project-tech-premium">
                {proj.tech.map(t => <span key={t} className="tech-badge-premium">{t}</span>)}
              </div>
              <a href="#" className="project-link-premium">View ↗</a>
            </div>
          ))}
        </div>
      </section>

      <section className="section-premium" id="services">
        <div className="reveal" style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div className="section-label">Services</div>
          <h2 className="premium-title">What I Offer</h2>
        </div>
        <div className="services-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          {[
            { title: 'Full-Stack Development', description: 'Building scalable, high-performance web applications from concept to deployment using modern stacks like Next.js, React, Node.js, and more.', icon: '💻' },
            { title: 'UI/UX Design', description: 'Crafting intuitive, beautiful user interfaces and experiences that engage users and drive conversions.', icon: '🎨' },
            { title: '3D Web Animations', description: 'Creating immersive 3D experiences and animations using Three.js, GSAP, and custom shaders to bring your ideas to life.', icon: '🌐' },
            { title: 'AI Integration', description: 'Integrating artificial intelligence capabilities into applications for smarter, more intuitive user experiences.', icon: '🤖' },
          ].map((service, i) => (
            <motion.div
              key={i}
              className="service-card reveal shadow-premium"
              whileHover={{ y: -10, scale: 1.02 }}
              style={{
                background: 'var(--ivory)',
                padding: '30px',
                borderRadius: '20px',
                border: '1px solid var(--line)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '15px'
              }}
            >
              <div style={{fontSize: '40px'}}>{service.icon}</div>
              <h3 style={{color: 'var(--accent)', fontSize: '24px', fontWeight: 600, marginBottom: '10px'}}>{service.title}</h3>
              <p className="premium-text">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-premium" id="experience">
        <div className="section-label reveal">Experience</div>
        <div className="exp-premium-grid" style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '6rem', marginTop: '4rem'}}>
          <div className="exp-timeline-premium">
            {[
              { year: '2024 — Present', role: 'Full-Stack Developer', company: 'Personal Brand', desc: 'Building a premium 3D portfolio and scalable web applications.' },
              { year: '2023 — 2024', role: 'UI/UX Designer', company: 'Digital Agency, Eldoret', desc: 'Crafting high-fidelity prototypes and intuitive user journeys.' },
              { year: '2022 — 2023', role: 'Freelance Web Developer', company: 'Remote Projects', desc: 'Delivered 12+ responsive websites for global clients.' },
            ].map((item, i) => (
              <div key={i} className="exp-item-premium" style={{padding: '2rem 0', borderBottom: '1px solid var(--line)'}}>
                <div className="exp-year-premium" style={{color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '11px'}}>{item.year}</div>
                <div className="exp-role-premium" style={{fontSize: '18px', fontWeight: 700, color: 'var(--charcoal)'}}>{item.role}</div>
                <div className="exp-company-premium" style={{fontSize: '12px', color: 'var(--muted)', marginBottom: '0.75rem'}}>{item.company}</div>
                <div className="exp-desc-premium" style={{fontSize: '12px', color: 'var(--muted)', lineHeight: '1.8'}}>{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="exp-right-premium reveal">
            <h2 className="premium-title" style={{fontSize: 'clamp(48px, 6vw, 96px)'}}>Building things<br />that <em style={{color: 'var(--accent)'}}>matter.</em></h2>
          </div>
        </div>
      </section>

      <VisualGallery />

      <section className="section-premium" id="testimonials" style={{padding: '100px 0'}}>
        <div className="reveal" style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div className="section-label">Testimonials</div>
          <h2 className="premium-title">What Clients Say</h2>
        </div>
        <div className="testimonials-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
          {[
            { name: 'Sarah Jenkins', role: 'CEO, TechFlow', text: 'Abdihakim is a visionary developer. The 3D interactions he built for our landing page increased our conversion rate by 40%.' },
            { name: 'Marcus Thorne', role: 'Founder, NexaScale', text: 'Pure professionalism. He doesn\'t just write code; he designs experiences. His attention to detail is unmatched in the region.' },
            { name: 'Elena Rodriguez', role: 'Creative Director, Studio V', text: 'The bridge between high-end design and robust engineering is where Abdihakim lives. A true asset to any project.' },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card reveal"
              whileHover={{ scale: 1.02 }}
              style={{
                background: 'var(--ivory)',
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid var(--line)',
                position: 'relative'
              }}
            >
              <div style={{fontSize: '40px', color: 'var(--accent)', position: 'absolute', top: '20px', left: '20px', opacity: 0.3}}>&quot;</div>
              <p className="premium-text" style={{fontStyle: 'italic', marginBottom: '20px'}}>{t.text}</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)'}} />
                <div>
                  <div style={{fontWeight: 700, fontSize: '14px', color: 'var(--charcoal)'}}>{t.name}</div>
                  <div style={{fontSize: '11px', color: 'var(--muted)'}}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-premium" id="faq">
        <div className="reveal" style={{textAlign: 'center', marginBottom: '4rem'}}>
          <div className="section-label">FAQ</div>
          <h2 className="premium-title">Common Questions</h2>
        </div>
        <div className="faq-container" style={{maxWidth: '800px', margin: '0 auto'}}>
          {[
            { q: 'What services do you offer?', a: 'I provide high-end Full-Stack Web Development, UI/UX Design, and specialized 3D Web Animations using Three.js and GSAP.' },
            { q: 'How do you handle project timelines?', a: 'I follow an agile approach with clear milestones, providing weekly updates and a dedicated staging environment for review.' },
            { q: 'Are you available for freelance work?', a: 'Yes, I am currently open for selective high-impact projects. Please reach out via the contact form.' },
          ].map((faq, i) => (
            <details key={i} className="faq-item reveal" style={{
              background: 'var(--ivory)',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid var(--line)',
              marginBottom: '15px',
              cursor: 'pointer'
            }}>
              <summary style={{fontWeight: 700, color: 'var(--charcoal)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                {faq.q}
                <IonIcon name="chevron-down-outline"></IonIcon>
              </summary>
              <p style={{marginTop: '15px', color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6'}}>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-premium" id="contact">
        <div className="contact-inner-premium">
          <div className="reveal">
            <div className="section-label">Get In Touch</div>
            <h2 className="premium-title" style={{fontSize: 'clamp(48px, 7vw, 112px)'}}>Let&apos;s<br /><em style={{color: 'var(--accent)'}}>build</em><br />together.</h2>
            <p className="premium-text">Whether you have a project in mind, want to collaborate, or just want to say hello — I&apos;m always up for a good conversation.</p>
            <div className="contact-links-premium" style={{marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <a href="mailto:abdihakma0@gmail.com" className="contact-link-premium" style={{padding: '1.25rem 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'var(--charcoal)', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <div style={{fontWeight: 700}}>Email</div>
                  <div style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)'}}>abdihakma0@gmail.com</div>
                </div>
                <span>↗</span>
              </a>
              <a href="https://github.com/abdihakim" className="contact-link-premium" style={{padding: '1.25rem 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'var(--charcoal)', display: 'flex', justifyContent: 'space-between'}}>
                <div>
                  <div style={{fontWeight: 700}}>GitHub</div>
                  <div style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)'}}>github.com/abdihakim</div>
                </div>
                <span>↗</span>
              </a>
            </div>
          </div>
          <div className="contact-form-premium reveal" style={{background: 'var(--ivory)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--line)'}}>
            <div className="section-label">Send A Message</div>
            <form style={{marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem'}} onSubmit={(e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 5000); }}>
              {submitted && (
                <div style={{background: 'var(--accent)', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '13px', marginBottom: '1rem'}}>
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
                <label style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)'}}>Your Name</label>
                <input type="text" style={{background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', padding: '0.75rem 0', color: 'var(--charcoal)', outline: 'none'}} placeholder="John Doe" />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
                <label style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)'}}>Email Address</label>
                <input type="email" style={{background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', padding: '0.75rem 0', color: 'var(--charcoal)', outline: 'none'}} placeholder="john@example.com" />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.6rem'}}>
                <label style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)'}}>Message</label>
                <textarea style={{background: 'transparent', border: 'none', borderBottom: '1px solid var(--line)', padding: '0.75rem 0', color: 'var(--charcoal)', outline: 'none', minHeight: '100px'}} placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="nav-cta" style={{width: '100%', cursor: 'pointer'}}>Send Message →</button>
            </form>
          </div>
        </div>
      </section>

      {/* Integrated 3D Portfolio Book as a full-width section */}
      <section className="section-premium" id="booklet" style={{ padding: '100px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label">Interactive Portfolio</div>
          <h2 className="premium-title">The Professional Booklet</h2>
          <p className="premium-text" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Dive into my detailed professional journey, skills, and achievements through this interactive 3D experience.
          </p>
        </div>
        <div className="book-container" style={{ width: '100%', maxWidth: '1100px', height: '80vh' }}>
            <PortfolioBook onClose={() => {}} theme={theme} />
        </div>
      </section>

      <footer className="premium-footer">
        <div>© 2026 Abdihakim Mohamed. All rights reserved.</div>
        <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <a href="https://github.com/abdihakim" target="_blank" rel="noopener noreferrer" style={{color: 'var(--muted)', fontSize: '12px', textDecoration: 'none'}}>GitHub</a>
          <a href="https://linkedin.com/in/abdihakim" target="_blank" rel="noopener noreferrer" style={{color: 'var(--muted)', fontSize: '12px', textDecoration: 'none'}}>LinkedIn</a>
          <a href="https://twitter.com/abdihakim" target="_blank" rel="noopener noreferrer" style={{color: 'var(--muted)', fontSize: '12px', textDecoration: 'none'}}>Twitter</a>
        </div>
        <div className="nav-logo" style={{fontSize: '20px', fontWeight: 800}}>am<span style={{color: 'var(--accent)'}}>.</span>dev</div>
        <div style={{fontSize: '12px', color: 'var(--muted)'}}>Based in Eldoret City, Kenya 🇰🇪</div>
      </footer>

    </div>
  );
};
