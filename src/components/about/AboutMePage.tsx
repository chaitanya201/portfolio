import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PresentationControls,
  Stars,
} from "@react-three/drei";
import {
  Brain,
  Heart,
  Lightbulb,
  Music,
  Code,
  BookOpen,
  ChevronLeft,
  Gamepad2,
} from "lucide-react";
import { ProfileSphere } from "./ProfileSphere";
import { StrengthsCube } from "./StrengthsCube";
import { WeaknessSphere } from "./WeaknessSphere";
import { HobbiesSphere } from "./HobbiesSphere";
import { SoftSkillsRing } from "./SoftSkillsRing";

const AboutMePage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.2]);

  const profileSummary = {
    title: "Profile Summary",
    content: [
      "Dynamic Software Development Engineer (SDE) with proven expertise in full-stack development, cloud computing, and container orchestration.",
      "Highly skilled in React.js, TypeScript, Next.js, Node.js, and Express.js, with deep experience in Docker, Kubernetes, and AWS cloud architecture.",
      "🏆 3x Kubernetes Certified (CKA, CKAD, KCNA) & AWS Certified Solutions Architect—demonstrating hands-on mastery in Kubernetes administration, cloud-native application development, and containerized deployments.",
      "🔥 Problem-solver, leader, and innovation-driven engineer. Recognized as a Best Performer at Livlong for delivering high-impact, scalable solutions and optimizing cloud workloads.",
      "Expert in CI/CD pipelines, microservices, distributed systems, and DevOps best practices.",
      "💡 Seeking to bring expertise in cloud, Kubernetes, and software engineering to a high-impact team that values technical excellence, performance optimization, and cutting-edge innovation.",
      "Let’s transform ideas into reality! 🚀🔥",
    ],
  };

  const softSkills = [
    {
      title: "Communication",
      icon: Brain,
      description:
        "Strong verbal and written communication skills, able to explain complex technical concepts clearly.",
    },
    {
      title: "Leadership",
      icon: Lightbulb,
      description:
        "Natural leader with experience in guiding teams and mentoring junior developers.",
    },
    {
      title: "Adaptability",
      icon: Heart,
      description:
        "Quick to learn and adapt to new technologies and changing project requirements.",
    },
  ];

  const strengths = [
    "Problem Solving",
    "Technical Architecture",
    "Code Quality",
    "System Design",
  ];

  const weaknesses = [
    {
      area: "Perfectionism",
      improvement:
        "Working on finding balance between perfection and delivery.",
    },
    {
      area: "Work-Life Balance",
      improvement: "Implementing better time management strategies.",
    },
  ];

  const hobbies = [
    { name: "Coding", icon: Code },
    { name: "Reading", icon: BookOpen },
    { name: "Music", icon: Music },
    { name: "Gaming", icon: Gamepad2 },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 0.5,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(109, 40, 217, 0.25)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: [0, 0.5, 0],
      scale: [1, 2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, purple 0%, transparent 70%)",
          backgroundSize: "200% 200%",
          backgroundPosition: backgroundY,
          opacity: backgroundOpacity,
        }}
      />

      {/* Stars Background */}
      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <Environment preset="night" />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <AnimatePresence mode="wait">
          {/* Profile Summary */}
          <motion.section
            key="profile"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, margin: "-100px" }}
            variants={sectionVariants}
            className="mb-32"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {profileSummary.title}
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] relative">
                <motion.div
                  className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 400 }}
                  >
                    <Float rotationIntensity={0.4}>
                      <ProfileSphere />
                    </Float>
                  </PresentationControls>
                  <Environment preset="sunset" />
                </Canvas>
              </div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.ul
                  className="text-xl leading-relaxed text-gray-300 p-3 space-y-3 rounded-lg"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.h3 className="text-2xl font-semibold mb-4 text-white">
                    🚀 Full-Stack Engineer | DevOps Engineer | 3x Kubernetes
                    Certified | AWS Certified Solutions Architect
                  </motion.h3>

                  {profileSummary.content.map((line, index) => (
                    <motion.li
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      custom={index}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="relative bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg transform-gpu"
                    >
                      {line}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div
                  className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Soft Skills */}
          <motion.section
            key="softSkills"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, margin: "-100px" }}
            variants={sectionVariants}
            className="mb-32"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Soft Skills
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] relative order-2 lg:order-1">
                <motion.div
                  className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                  >
                    <Float rotationIntensity={0.4}>
                      <SoftSkillsRing />
                    </Float>
                  </PresentationControls>
                  <Environment preset="dawn" />
                </Canvas>
              </div>
              <div className="grid gap-6 order-1 lg:order-2">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={skill.title}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    custom={index}
                    onHoverStart={() => setHoveredCard(index)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="relative bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg transform-gpu"
                  >
                    <motion.div
                      variants={glowVariants}
                      initial="initial"
                      animate={hoveredCard === index ? "animate" : "initial"}
                      className="absolute inset-0 bg-purple-600/20 rounded-lg blur-xl -z-10"
                    />
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-3 bg-purple-600/20 rounded-full"
                      >
                        <skill.icon className="w-6 h-6 text-purple-400" />
                      </motion.div>
                      <div>
                        <motion.h3
                          className="text-xl font-semibold mb-2"
                          whileHover={{ x: 10 }}
                        >
                          {skill.title}
                        </motion.h3>
                        <p className="text-gray-300">{skill.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Strengths */}
          <motion.section
            key="strengths"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, margin: "-100px" }}
            variants={sectionVariants}
            className="mb-32"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Strengths
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600/30 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                  >
                    <Float rotationIntensity={0.4}>
                      <StrengthsCube />
                    </Float>
                  </PresentationControls>
                  <Environment preset="warehouse" />
                </Canvas>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {strengths.map((strength, index) => (
                  <motion.div
                    key={strength}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    custom={index}
                    className="relative p-6 rounded-lg text-lg font-semibold backdrop-blur-xl group cursor-pointer overflow-hidden"
                  >
                    {/* Background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-40 rounded-xl"
                      initial={{ scale: 1.2, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.7 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    {/* Neon border animation */}
                    <motion.div
                      className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-px"
                      initial={{ scale: 1.2 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    {/* Card Content */}
                    <div className="relative z-10 flex items-center justify-center h-full">
                      <span className="text-white text-center relative z-10">
                        {strength}
                      </span>
                    </div>

                    {/* Glowing Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 rounded-xl blur-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.6 }}
                      transition={{ duration: 0.6 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Areas for Growth */}
          <motion.section
            key="weaknesses"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, margin: "-100px" }}
            variants={sectionVariants}
            className="mb-32"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Areas for Growth
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] relative order-2 lg:order-1">
                <motion.div
                  className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                  >
                    <Float rotationIntensity={0.4}>
                      <WeaknessSphere />
                    </Float>
                  </PresentationControls>
                  <Environment preset="forest" />
                </Canvas>
              </div>
              <div className="grid gap-6 order-1 lg:order-2">
                {weaknesses.map((weakness, index) => (
                  <motion.div
                    key={weakness.area}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    custom={index}
                    className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-lg relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                      initial={{ y: "-100%" }}
                      whileHover={{ y: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <h3 className="text-xl font-semibold mb-2 relative z-10">
                      {weakness.area}
                    </h3>
                    <p className="text-gray-300 relative z-10">
                      {weakness.improvement}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Hobbies */}
          <motion.section
            key="hobbies"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, margin: "-100px" }}
            variants={sectionVariants}
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hobbies
            </motion.h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="h-[400px] relative">
                <motion.div
                  className="absolute inset-0 bg-purple-600/20 rounded-xl blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                  >
                    <Float rotationIntensity={0.4}>
                      <HobbiesSphere />
                    </Float>
                  </PresentationControls>
                  <Environment preset="sunset" />
                </Canvas>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={hobby.name}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    custom={index}
                    className="bg-gradient-to-r from-indigo-800 via-blue-700 to-purple-800 backdrop-blur-lg p-6 rounded-lg flex flex-col items-center gap-4 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10"
                    >
                      <hobby.icon className="w-8 h-8 text-purple-400" />
                    </motion.div>
                    <span className="font-medium text-xl text-white relative z-10">
                      {hobby.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AboutMePage;
