import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const HolographicModel = () => {
  const mainRef = useRef<THREE.Group>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();

    // Main group rotation
    if (mainRef.current) {
      mainRef.current.rotation.y = time * 0.2;
      mainRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;

      // Mouse interaction
      mainRef.current.rotation.x += (mouse.y * 0.5 - mainRef.current.rotation.x) * 0.1;
      mainRef.current.rotation.y += (mouse.x * 0.5 - mainRef.current.rotation.y) * 0.1;
    }

    // Sphere pulsing
    if (sphereRef.current) {
      sphereRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
    }

    // Ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.5;
      ringRef.current.rotation.y = time * 0.2;
      ringRef.current.scale.setScalar(1 + Math.sin(time) * 0.2);
    }
  });

  return (
    <group ref={mainRef}>
      {/* Central Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#4c1d95"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Ring */}
      <mesh ref={ringRef} scale={1.5}>
        <torusGeometry args={[1.2, 0.1, 16, 100]} />
        <meshPhysicalMaterial
          color="#6d28d9"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbiting Particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2;
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
              color="#7c3aed"
              emissive="#7c3aed"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        );
      })}

      {/* Energy Beams */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`beam-${i}`}
            position={[
              Math.cos(angle) * 1.5,
              Math.sin(angle) * 1.5,
              0,
            ]}
            scale={[0.05, 2, 0.05]}
            rotation={[0, 0, angle]}
          >
            <cylinderGeometry />
            <meshPhysicalMaterial
              color="#9333ea"
              transparent
              opacity={0.3}
              emissive="#9333ea"
              emissiveIntensity={2}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default HolographicModel;