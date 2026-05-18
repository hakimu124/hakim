"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useCursorPosition } from '@/hooks/useCursorPosition';
import Image from 'next/image';

export function Avatar3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { x, y } = useCursorPosition();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: containerRef.current!.querySelector('canvas')!,
      alpha: true,
      antialias: true
    });

    renderer.setSize(400, 400);
    renderer.setPixelRatio(window.devicePixelRatio);

    // a "Robot" shell that surrounds the real image
    const robotShell = new THREE.Group();

    const ringGeo = new THREE.TorusGeometry(1.2, 0.05, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xD4AF37, emissive: 0xD4AF37, emissiveIntensity: 0.5 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    robotShell.add(ring);

    const orbitGeo = new THREE.TorusGeometry(1.5, 0.02, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0xD4AF37, transparent: true, opacity: 0.3 });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = Math.PI / 2;
    robotShell.add(orbit);

    scene.add(robotShell);

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 3;

    const animate = () => {
      requestAnimationFrame(animate);
      robotShell.rotation.y = x * 0.3;
      robotShell.rotation.x = -y * 0.3;
      orbit.rotation.z += 0.01;
      renderer.render(scene, camera);
    };

    animate();
    return () => renderer.dispose();
  }, [x, y]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* The Real Image: Centerpiece */}
      <div className="absolute z-10 w-3/4 h-3/4 rounded-full overflow-hidden border-2 border-gold/30 shadow-2xl">
        <Image
          src="/images/gallery/photo-01.avif"
          alt="Abdihakim Mohamed"
          fill
          className="object-cover scale-110 transition-transform duration-700 hover:scale-125"
        />
      </div>

      {/* The 3D Robot Shell that tracks eye movement */}
      <canvas className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
    </div>
  );
}
