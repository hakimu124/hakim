"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BOOT_LOGS = [
  "[ OK ] Initializing portfolio runtime...",
  "[ OK ] Loading design system...",
  "[ WARN ] Creativity level exceeds normal parameters...",
  "[ OK ] Identity verified: Abdihakim Mohamed",
  "[ OK ] Connecting to secure server...",
  "[ OK ] Establishing neural link...",
  "[ OK ] Experience ready.",
];

export const HackingPortalLoader = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<number>(0);
  const [signatureVisible, setSignatureVisible] = useState(false);
  const [nodes, setNodes] = useState<{top: string, left: string, delay: string}[]>(() =>
    [...Array(15)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`
    }))
  );
  const [time, setTime] = useState("");

  useEffect(() => {
    // HUD Clock
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    // Matrix Rain
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%";
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = new Array(columns).fill(1);

        const draw = () => {
          ctx.fillStyle = "rgba(8, 10, 15, 0.05)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#00d4ff";
          ctx.font = `${fontSize}px 'DM Mono', monospace`;

          for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        };
        const rainInterval = setInterval(draw, 33);
        window.addEventListener('resize', () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        });
        return () => {
          clearInterval(rainInterval);
        }
      }
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const duration = 4000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(p);

      // Trigger logs based on progress
      const logIndex = Math.floor((p / 100) * BOOT_LOGS.length);
      setVisibleLogs(logIndex);

      if (p === 100) {
        setSignatureVisible(true);
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power4.inOut",
              onComplete: onComplete,
            });
          } else {
            onComplete();
          }
        }, 1500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: onComplete,
      });
    } else {
      onComplete();
    }
  };

  return (
    <div className="cinematic-loader" ref={containerRef} onClick={handleSkip}>
      <canvas ref={canvasRef} className="matrix-canvas" />

      <div className="hud-overlay">
        <div className="hud-top-bar">
          <div>SYS.CORE // ACCESS_LEVEL: ADMIN</div>
          <div>{time} UTC</div>
          <div>STATUS: INITIALIZING...</div>
        </div>
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />
        <div className="scanline" />
        <div className="vignette" />
      </div>

      <div className="node-network">
        {nodes.map((node, i) => (
          <div
            key={i}
            className="node"
            style={{
              top: node.top,
              left: node.left,
              animationDelay: node.delay
            }}
          />
        ))}
      </div>

      <div className="loader-main-content">
        <h1 className={`neon-signature ${signatureVisible ? 'visible' : ''}`}>
          Abdihakim Mohamed
        </h1>

        <div className="boot-logs">
          {BOOT_LOGS.map((log, i) => (
            <div key={i} className={`log-line ${i < visibleLogs ? 'visible' : ''}`}>
              {log}
            </div>
          ))}
        </div>

        <div className="loading-bar-container">
          <span className="loading-bar-label">Initializing Experience...</span>
          <div className="loading-bar-track">
            <div className="loading-bar-fill" style={{ width: `${progress}%` }} />
            <div className="loading-bar-segments">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="segment" />
              ))}
            </div>
          </div>
          <span className="loading-bar-label" style={{ fontSize: '12px' }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
