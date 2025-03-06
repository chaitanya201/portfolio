import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export const ContactSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.Material>(null);

  useFrame(({ clock, pointer }) => {
    if (sphereRef.current) {
      // Gentle floating animation
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      
      // Rotate based on mouse position
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(
        sphereRef.current.rotation.x,
        pointer.y * 0.2,
        0.1
      );
      sphereRef.current.rotation.y = THREE.MathUtils.lerp(
        sphereRef.current.rotation.y,
        pointer.x * 0.2,
        0.1
      );
    }
  });

  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#4c1d95"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Decorative smaller spheres */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 2.5;
        return (
          <Sphere
            key={i}
            args={[0.1, 32, 32]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <MeshDistortMaterial
              color="#7c3aed"
              attach="material"
              distort={0.2}
              speed={4}
              roughness={0.2}
              metalness={1}
            />
          </Sphere>
        );
      })}
    </group>
  );
};