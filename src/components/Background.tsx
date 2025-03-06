import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const ParticleField = () => {
  const particles = Array.from({ length: 100 }, (_, i) => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    z: Math.random() * 10 - 5,
  }));

  return (
    <group>
      {particles.map((p, i) => (
        <Particle key={i} position={[p.x, p.y, p.z]} />
      ))}
    </group>
  );
};

const Particle = ({ position }: { position: [number, number, number] }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x += Math.sin(Date.now() * 0.001) * 0.01;
      ref.current.position.y += Math.cos(Date.now() * 0.001) * 0.01;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  );
};

const Background = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full min-h-screen" style={{ zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        style={{ background: '#111827' }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default Background;