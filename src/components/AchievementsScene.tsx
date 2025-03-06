import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Octahedron, MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const AchievementsScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const mainRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }

    if (mainRef.current) {
      mainRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      mainRef.current.position.x = THREE.MathUtils.lerp(
        mainRef.current.position.x,
        mouse.x * 0.5,
        0.1
      );
      mainRef.current.position.y = THREE.MathUtils.lerp(
        mainRef.current.position.y,
        mouse.y * 0.5,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Octahedron ref={mainRef} args={[1.5, 0]} scale={1.2}>
        <MeshDistortMaterial
          color="#4c1d95"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Octahedron>

      {/* Orbiting icosahedrons */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const radius = 3;
        return (
          <Icosahedron
            key={i}
            args={[0.3, 0]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <meshPhysicalMaterial
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </Icosahedron>
        );
      })}
    </group>
  );
};

export default AchievementsScene;