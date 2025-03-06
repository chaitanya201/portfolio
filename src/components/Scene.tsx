import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Scene() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock, mouse }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.3;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      // Add mouse interaction
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
    <Sphere ref={sphereRef} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color="#6d28d9"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
}