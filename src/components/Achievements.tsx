import React from "react";
import { motion } from "framer-motion";
import { Award, Medal } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, Float } from '@react-three/drei';
import AchievementsScene from './AchievementsScene';

const Achievements = () => {
  const achievements = [
  {
    title: "Kubernetes and Cloud Native Associate (KCNA)",
    description:
      "Self-studied and successfully cracked the KCNA certification with a 95% score in the first attempt, demonstrating strong fundamentals in Kubernetes, cloud-native technologies, and container orchestration. Proved expertise in key concepts such as microservices, container runtime, observability, and GitOps practices.",
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    description:
      "Earned the prestigious CKA certification by mastering Kubernetes administration, troubleshooting, and cluster management. Showcased expertise in deploying, scaling, and maintaining applications, securing workloads, configuring networking, and ensuring high availability within Kubernetes clusters.",
  },

  {
    title: "Best Performer Award at Livlong",
    description:
      "Recognized for outstanding contributions, leadership, and impact on critical projects, demonstrating exceptional problem-solving skills and delivering high-quality solutions consistently. Led cross-functional teams, optimized application performance, and played a key role in achieving business goals through innovation and technical excellence.",
  },

];

  return (
    <section id="achievements" className="py-20 text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at center, purple 0%, transparent 70%)",
          backgroundSize: "100% 100%",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3"
        >
          <Award className="text-purple-400" /> Achievements
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* 3D Scene */}
          <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full relative order-2 lg:order-1">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              className="!touch-none"
            >
              <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Float rotationIntensity={0.4}>
                  <AchievementsScene />
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 gap-6 order-1 lg:order-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -180 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
                }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                className="bg-gray-800 p-6 rounded-lg text-center transform-gpu"
              >
                <Medal className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-gray-400">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;