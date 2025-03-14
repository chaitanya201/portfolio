import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const StrengthsCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      cubeRef.current.rotation.y = clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group>
      <Box ref={cubeRef} args={[2, 2, 2]}>
        <MeshDistortMaterial
          color="#4c1d95"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Box>

      {/* Orbiting cubes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        return (
          <Box
            key={i}
            args={[0.3, 0.3, 0.3]}
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
          </Box>
        );
      })}
    </group>
  );
};
