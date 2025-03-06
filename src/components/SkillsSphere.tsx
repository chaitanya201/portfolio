import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';

const SkillsSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }

    if (sphereRef.current) {
      sphereRef.current.position.x = THREE.MathUtils.lerp(
        sphereRef.current.position.x,
        mouse.x * 0.5,
        0.1
      );
      sphereRef.current.position.y = THREE.MathUtils.lerp(
        sphereRef.current.position.y,
        mouse.y * 0.5,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Stars
        radius={100}
        depth={50}
        count={1000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#4c1d95"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Orbiting spheres */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        return (
          <Sphere
            key={i}
            args={[0.1, 16, 16]}
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
          </Sphere>
        );
      })}
    </group>
  );
};

export default SkillsSphere;