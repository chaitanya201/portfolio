import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export const WeaknessSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
      sphereRef.current.scale.setScalar(
        1 + Math.sin(clock.getElapsedTime()) * 0.1
      );
    }
  });

  return (
    <group>
      <Sphere ref={sphereRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#6d28d9"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>

      {/* Energy rings */}
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i} position={[0, i * 0.5 - 1, 0]}>
          <Sphere args={[1.5 + i * 0.2, 32, 32]} scale={[1, 0.05, 1]}>
            <meshPhysicalMaterial
              color="#9333ea"
              transparent
              opacity={0.3 - i * 0.1}
              emissive="#9333ea"
              emissiveIntensity={1}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
};
