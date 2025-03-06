import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";
import HolographicModel from "./Placeholder";
import { Code, Brain, Rocket, Coffee } from "lucide-react";

const aboutInfo = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "🚀 Results-driven Software Development Engineer (SDE) with expertise in React.js, Next.js, TypeScript, Node.js, and Express.js. Passionate about building scalable, cloud-native applications.",
  },
  {
    icon: Brain,
    title: "Backend & DevOps",
    description:
      "🔹 Experienced in designing high-performance systems, leveraging MongoDB, PostgreSQL, and Redis. Certified in Kubernetes (CKA, CKAD, KCNA) with hands-on cloud infrastructure experience.",
  },
  {
    icon: Rocket,
    title: "Leadership",
    description:
      "🔹 Recognized as a Best Performer for taking full ownership of projects, delivering high-impact solutions, and fostering seamless cross-team collaboration.",
  },
  {
    icon: Coffee,
    title: "Problem Solving",
    description:
      "🔹 Passionate about solving complex technical challenges and optimizing system performance. Strong focus on code quality and best practices.",
  },
];

const AboutMe = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(109, 40, 217, 0.25)",
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const glowVariants = {
    idle: {
      opacity: 0.5,
      scale: 1,
    },
    hover: {
      opacity: 0.8,
      scale: 1.2,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 text-white overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, purple 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 flex items-center justify-center gap-3"
        >
          About Me
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="inline-block"
          >
            🚀
          </motion.span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* 3D Model Section */}
          <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative order-2 lg:order-1">
            <motion.div
              className="absolute inset-0"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(109, 40, 217, 0.2)",
                  "0 0 40px rgba(109, 40, 217, 0.4)",
                  "0 0 20px rgba(109, 40, 217, 0.2)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Float rotationIntensity={0.4}>
                  <HolographicModel />
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* Info Cards Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="grid gap-4 sm:gap-6 order-1 lg:order-2"
          >
            <AnimatePresence>
              {aboutInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative bg-gray-800/50 backdrop-blur-lg p-4 sm:p-6 rounded-lg transform-gpu"
                >
                  {/* Glow Effect */}
                  <motion.div
                    variants={glowVariants}
                    initial="idle"
                    animate={hoveredIndex === index ? "hover" : "idle"}
                    className="absolute inset-0 bg-purple-600/20 rounded-lg blur-xl -z-10"
                  />

                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-2 sm:p-3 bg-purple-600/20 rounded-full shrink-0"
                    >
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </motion.div>
                    <div>
                      <motion.h3
                        className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2"
                        whileHover={{ x: 10 }}
                      >
                        {info.title}
                      </motion.h3>
                      <p className="text-sm sm:text-base text-gray-300">
                        {info.description}
                      </p>
                    </div>
                  </div>

                  {/* Particle Effects */}
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-purple-400 rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                            scale: 0,
                          }}
                          animate={{
                            x: ["50%", `${50 + (Math.random() * 100 - 50)}%`],
                            y: ["50%", `${50 + (Math.random() * 100 - 50)}%`],
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1 + Math.random(),
                            repeat: Infinity,
                            repeatDelay: Math.random(),
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
