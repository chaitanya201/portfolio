import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const HobbiesSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      sphereRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#4c1d95"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Sphere>

      {/* Orbiting hobby indicators */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 2.5;
        return (
          <group key={i}>
            <Sphere
              args={[0.2, 16, 16]}
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

            {/* Connecting line */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, radius * 2]} />
              <meshPhysicalMaterial
                color="#9333ea"
                transparent
                opacity={0.3}
                emissive="#9333ea"
                emissiveIntensity={1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
