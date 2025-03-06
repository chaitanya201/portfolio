import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion-3d";

const Background = () => {
  const backgroundRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (backgroundRef.current) {
      backgroundRef.current.rotation.y += 0.0005;
      backgroundRef.current.position.y =
        Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <motion.group ref={backgroundRef}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </motion.group>
  );
};
function FloatingObject({
  position,
  color,
  scale,
  speed,
  distort = 0,
  geometry,
}: any) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(clock.getElapsedTime() * speed) * 1.2;
      ref.current.position.x =
        position[0] + Math.cos(clock.getElapsedTime() * speed * 0.5) * 1;
      ref.current.rotation.x = clock.getElapsedTime() * 0.5;
      ref.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  console.log("printed");
  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry}
      {distort ? (
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={distort}
          roughness={0}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      ) : (
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
          transparent
          opacity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      )}
    </mesh>
  );
}

function Shapes() {
  return (
    <>
      {/* Large sphere in the back */}
      <FloatingObject
        position={[-4, 2, -2]}
        color="#6d28d9"
        scale={4}
        speed={0.3}
        distort={0.4}
        geometry={<sphereGeometry args={[1, 32, 32]} />}
      />

      {/* Box cluster */}
      <FloatingObject
        position={[4, -3, -1]}
        color="#9333ea"
        scale={3}
        speed={0.4}
        geometry={<boxGeometry args={[1, 1, 1]} />}
      />

      {/* Torus ring */}
      <FloatingObject
        position={[0, 4, 0]}
        color="#7c3aed"
        scale={2.5}
        speed={0.5}
        distort={0.2}
        geometry={<torusGeometry args={[1, 0.4, 16, 100]} />}
      />

      {/* Additional decorative objects */}
      <FloatingObject
        position={[-3, -4, -1]}
        color="#4c1d95"
        scale={2}
        speed={0.6}
        geometry={<octahedronGeometry args={[1]} />}
      />

      <FloatingObject
        position={[3, 5, -2]}
        color="#5b21b6"
        scale={2.5}
        speed={0.45}
        distort={0.3}
        geometry={<dodecahedronGeometry args={[1]} />}
      />

      <FloatingObject
        position={[5, 0, -3]}
        color="#8b5cf6"
        scale={3}
        speed={0.35}
        geometry={<icosahedronGeometry args={[1]} />}
      />
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 8], fov: 75 }}
      >
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 5, 15]} />
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={5} color="#7c3aed" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#4c1d95" />
        <spotLight
          position={[0, 5, 10]}
          angle={0.6}
          penumbra={1}
          intensity={5}
          color="#6d28d9"
        />
        <Shapes />
        <Background />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.5}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
