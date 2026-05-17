"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00abf0" intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#00abf0" intensity={1} />

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={1.5} position={[2, 1, -2]}>
          <MeshDistortMaterial color="#00abf0" speed={3} distort={0.4} radius={1} />
        </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh ref={torusRef} position={[-2, -1, -1]} scale={1.2}>
          <torusGeometry args={[0.7, 0.3, 16, 100]} />
          <meshStandardMaterial color="#00abf0" wireframe />
        </mesh>
      </Float>

      <Particles />
    </>
  );
};

const Particles = () => {
  const pointsGeo = React.useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200 * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={pointsGeo}>
      <pointsMaterial size={0.05} color="#00abf0" transparent opacity={0.6} />
    </points>
  );
};

export const Hero3D = () => {
  return (
    <div className="hero-3d-canvas">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <FloatingShapes />
      </Canvas>
      <style jsx>{`
        .hero-3d-canvas {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          background: radial-gradient(circle at center, transparent, var(--charcoal));
        }
      `}</style>
    </div>
  );
};
