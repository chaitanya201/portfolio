import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const SoftSkillsRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group>
      <Torus ref={ringRef} args={[1.5, 0.4, 16, 100]}>
        <MeshDistortMaterial
          color="#6d28d9"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Torus>

      {/* Decorative spheres */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial
              color="#9333ea"
              emissive="#9333ea"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
};
