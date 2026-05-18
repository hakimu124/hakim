"use client";
import React, { useState, useEffect } from 'react';
import { IonIcon } from '@/components/ui/IonIcon';
import Image from 'next/image';
import './PortfolioBook.css';

interface PortfolioBookProps {
  onClose: () => void;
}

export const PortfolioBook = ({ onClose, theme }: { onClose: () => void; theme: 'light' | 'dark' }) => {
  const [flippedPages, setFlippedPages] = useState<Set<number>>(new Set());
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCoverOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--book-page-bg', 'linear-gradient(90deg, #1a1a1a, #333)');
      root.style.setProperty('--book-text-color', '#f5f5f5');
      root.style.setProperty('--book-text-muted', '#bbb');
    } else {
      root.style.setProperty('--book-page-bg', 'linear-gradient(90deg, #fff, #ddd)');
      root.style.setProperty('--book-text-color', '#333');
      root.style.setProperty('--book-text-muted', '#555');
    }
  }, [theme]);

  const handlePageTurn = (pageIndex: number) => {
    setFlippedPages(prev => {
      const next = new Set(prev);
      if (next.has(pageIndex)) {
        next.delete(pageIndex);
        // To allow a natural reverse flip, we remove current page
        // But for "easy flip" the user might expect a sequence
        for (let i = pageIndex + 1; i <= 3; i++) {
          next.delete(i);
        }
      } else {
        next.add(pageIndex);
      }
      return next;
    });
  };

  const handleContactMe = () => {
    setFlippedPages(new Set([1, 2, 3]));
  };

  return (
    <div className="book-wrapper">
      <div className="cover cover-left"></div>
      <div className={`cover cover-right ${isCoverOpen ? 'turn' : ''}`}
           onClick={() => setIsCoverOpen(!isCoverOpen)}></div>

      <div className="book">
        {/* profile page */}
        <div className="book-page page-left">
          <div className="profile-page">
            <Image src="/favicon.ico" alt="Abdihakim Mohamed" width={200} height={200} priority />
            <h1>Abdihakim Mohamed</h1>
            <h3>Web Developer & UI/UX Designer</h3>

            <div className="social-media">
              <a href="#"><IonIcon name="logo-facebook"></IonIcon></a>
              <a href="#"><IonIcon name="logo-twitter"></IonIcon></a>
              <a href="#"><IonIcon name="logo-instagram"></IonIcon></a>
              <a href="#"><IonIcon name="logo-linkedin"></IonIcon></a>
            </div>

            <p>
              Hi, I'm Abdihakim Mohamed, a professional Web Developer & UI/UX Designer based in Eldoret City, Kenya.
              I specialize in crafting high-performance, visually stunning digital experiences with a focus on 3D interactivity and clean architecture.
            </p>

            <div className="btn-box">
              <a href="/abdi-hakimu.docx" download className="btn">Download CV</a>
              <a href="#" className="btn contact-me" onClick={(e) => { e.preventDefault(); handleContactMe(); }}>Contact Me!</a>
            </div>
          </div>
        </div>

        {/* page 1 & 2 */}
        <div className={`book-page page-right ${flippedPages.has(1) ? 'turn' : ''}`} id="turn-1" style={{ zIndex: flippedPages.has(1) ? 1 : 3 }}>
          <div className="page-front">
            <h1 className="title">Work Experience</h1>
            <div className="workeduc-box">
              <div className="workeduc-content">
                <span className="year"><IonIcon name="calendar"></IonIcon>2024 — Present</span>
                <h3>Full-Stack Developer - Personal Brand</h3>
                <p>Developing premium portfolio websites and high-end client projects with a focus on 3D interactivity.</p>
              </div>
              <div className="workeduc-content">
                <span className="year"><IonIcon name="calendar"></IonIcon>2023 — 2024</span>
                <h3>UI/UX Designer - Digital Agency</h3>
                <p>Crafting intuitive user interfaces and high-fidelity prototypes for various enterprise clients in Eldoret.</p>
              </div>
              <div className="workeduc-content">
                <span className="year"><IonIcon name="calendar"></IonIcon>2022 — 2023</span>
                <h3>Freelance Web Developer</h3>
                <p>Built and deployed over 12+ responsive websites for global clients across diverse industries.</p>
              </div>
            </div>
            <span className="number-page">1</span>
            <span className="nextprev-btn" onClick={() => handlePageTurn(1)}>
              <IonIcon name="chevron-right"></IonIcon>
            </span>
          </div>

          <div className="page-back">
            <h1 className="title">Education</h1>
            <div className="workeduc-box">
              <div className="workeduc-content">
                <span className="year"><IonIcon name="calendar"></IonIcon>2024 — Present</span>
                <h3>Advanced Full-Stack Specialization</h3>
                <p>Self-taught mastery in Next.js, Three.js, and advanced architectural patterns.</p>
              </div>
              <div className="workeduc-content">
                <span className="year"><IonIcon name="calendar"></IonIcon>2022 — 2024</span>
                <h3>Diploma in Computer Science</h3>
                <p>Comprehensive study of software engineering, algorithms, and web technologies.</p>
              </div>
              <div className="workeduc-content">
                <span className="year"><IonIcon name="calendar"></IonIcon>2018 — 2022</span>
                <h3>Secondary School Certificate</h3>
                <p>Foundational education in Kenya with a focus on mathematics and sciences.</p>
              </div>
            </div>
            <span className="number-page">2</span>
            <span className="nextprev-btn back" onClick={() => handlePageTurn(1)}>
              <IonIcon name="chevron-left"></IonIcon>
            </span>
          </div>
        </div>

        {/* page 3 & 4 */}
        <div className={`book-page page-right ${flippedPages.has(2) ? 'turn' : ''}`} id="turn-2" style={{ zIndex: flippedPages.has(2) ? 1 : 2 }}>
          <div className="page-front">
            <h1 className="title">My Services</h1>
            <div className="services-box">
              <div className="services-content">
                <IonIcon name="code-slash-outline"></IonIcon>
                <h3>Web Development</h3>
                <p>Full-stack applications with Next.js and Node.js.</p>
                <a href="#" className="btn">Read More</a>
              </div>
              <div className="services-content">
                <IonIcon name="brush-outline"></IonIcon>
                <h3>Creative Design</h3>
                <p>High-end UI/UX design focusing on conversion.</p>
                <a href="#" className="btn">Read More</a>
              </div>
              <div className="services-content">
                <IonIcon name="bar-chart-outline"></IonIcon>
                <h3>Digital Marketing</h3>
                <p>Growth strategies and brand positioning.</p>
                <a href="#" className="btn">Read More</a>
              </div>
              <div className="services-content">
                <IonIcon name="search-outline"></IonIcon>
                <h3>SEO</h3>
                <p>Optimizing visibility and organic reach.</p>
                <a href="#" className="btn">Read More</a>
              </div>
            </div>
            <span className="number-page">3</span>
            <span className="nextprev-btn" onClick={() => handlePageTurn(2)}>
              <IonIcon name="chevron-right"></IonIcon>
            </span>
          </div>

          <div className="page-back">
            <h1 className="title">My Skills</h1>
            <div className="skills-box">
              <div className="skills-content">
                <h3>Front-End</h3>
                <div className="content">
                  <span><IonIcon name="logo-html5"></IonIcon> HTML</span>
                  <span><IonIcon name="logo-css3"></IonIcon> CSS</span>
                  <span><IonIcon name="logo-javascript"></IonIcon> JS</span>
                  <span><IonIcon name="logo-react"></IonIcon> React</span>
                  <span><IonIcon name="logo-nextjs"></IonIcon> Next.js</span>
                </div>
              </div>
              <div className="skills-content">
                <h3>Back-End</h3>
                <div className="content">
                  <span><IonIcon name="logo-python"></IonIcon> Python</span>
                  <span><IonIcon name="logo-node"></IonIcon> Node JS</span>
                  <span><IonIcon name="logo-php"></IonIcon> PHP</span>
                </div>
              </div>
              <div className="skills-content">
                <h3>UI/UX Design</h3>
                <div className="content">
                  <span><IonIcon name="logo-figma"></IonIcon> Figma</span>
                </div>
              </div>
            </div>
            <span className="number-page">4</span>
            <span className="nextprev-btn back" onClick={() => handlePageTurn(2)}>
              <IonIcon name="chevron-left"></IonIcon>
            </span>
          </div>
        </div>

        {/* page 5 & 6 */}
        <div className={`book-page page-right ${flippedPages.has(3) ? 'turn' : ''}`} id="turn-3" style={{ zIndex: flippedPages.has(3) ? 1 : 1 }}>
          <div className="page-front">
            <h1 className="title">Latest Project</h1>
            <div className="portfolio-box">
              <div className="img-box">
                <Image src="/images/gallery/photo-01.avif" alt="Premium Project" width={400} height={300} />
              </div>
              <div className="info-box">
                <div className="info-title">
                  <h3>Premium Portfolio</h3>
                  <a href="#" className="preview-link">Live Preview <IonIcon name="link-external"></IonIcon></a>
                </div>
                <p>Tech Used: Next.js, Three.js, GSAP</p>
                <p>A $20K-level professional portfolio with interactive 3D elements and fluid animations.</p>
              </div>
              <div className="btn-box">
                <a href="#" className="btn">Source Code</a>
                <a href="#" className="btn">More Projects</a>
              </div>
            </div>
            <span className="number-page">5</span>
            <span className="nextprev-btn" onClick={() => handlePageTurn(3)}>
              <IonIcon name="chevron-right"></IonIcon>
            </span>
          </div>

          <div className="page-back">
            <h1 className="title">Contact Me!</h1>
            <div className="contact-info-box" style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--book-text-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                <IonIcon name="call-outline" style={{ color: 'var(--accent)' }}></IonIcon>
                <span>+254 722 287 517</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <IonIcon name="mail-outline" style={{ color: 'var(--accent)' }}></IonIcon>
                <span>abdihakma0@gmail.com</span>
              </div>
            </div>
            <div className="contact-box">
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" className="field" placeholder="Full Name" required />
                <input type="email" className="field" placeholder="Email Address" required />
                <textarea className="field" placeholder="Your Message" rows={5} required></textarea>
                <input type="submit" value="Send Message" className="btn" />
              </form>
            </div>
            <span className="number-page">6</span>
            <span className="nextprev-btn back" onClick={() => handlePageTurn(3)}>
              <IonIcon name="chevron-left"></IonIcon>
            </span>
            <a href="#" className="back-profile" onClick={(e) => { e.preventDefault(); onClose(); }}>
              <p>Close</p>
              <IonIcon name="close-circle"></IonIcon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
