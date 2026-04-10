'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Model({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sedan/model.gltf');
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    
    // Smooth rotation based on scroll
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      scrollProgress * Math.PI * 2 + Math.PI / 4,
      0.05
    );

    // Subtle floating animation
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t / 1.5) / 20;

    // React to mouse
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.mouse.y * 0.1,
      0.05
    );
  });

  return <primitive ref={group} object={scene} scale={1.2} />;
}

export default function Hero3D({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 1, 5]} fov={30} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Model scrollProgress={scrollProgress} />
          <ContactShadows 
            position={[0, -0.6, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={1} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/sedan/model.gltf');
