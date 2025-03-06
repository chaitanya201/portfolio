import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const GlobeMesh = () => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#00ffcc" : "#1e1e1e"}
        emissive={hovered ? "#00ffcc" : "#000"}
      />
    </mesh>
  );
};

const Globe = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={false} />
        <GlobeMesh />
      </Canvas>
    </div>
  );
};

export default Globe;