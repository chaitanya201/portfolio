import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, MeshDistortMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';

const ProjectsScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = clock.getElapsedTime() * 0.5;
      torusRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      torusRef.current.position.x = THREE.MathUtils.lerp(
        torusRef.current.position.x,
        mouse.x * 0.5,
        0.1
      );
      torusRef.current.position.y = THREE.MathUtils.lerp(
        torusRef.current.position.y,
        mouse.y * 0.5,
        0.1
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Torus ref={torusRef} args={[1.5, 0.4, 16, 100]}>
        <MeshDistortMaterial
          color="#6d28d9"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.9}
        />
      </Torus>

      {/* Floating cubes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3;
        return (
          <Box
            key={i}
            args={[0.4, 0.4, 0.4]}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <meshPhysicalMaterial
              color="#9333ea"
              transparent
              opacity={0.8}
              metalness={0.9}
              roughness={0.1}
            />
          </Box>
        );
      })}
    </group>
  );
};

export default ProjectsScene;