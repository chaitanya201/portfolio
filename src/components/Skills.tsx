import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as SimpleIcons from 'simple-icons';
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, Float } from '@react-three/drei';
import SkillsSphere from './SkillsSphere';

const Skills = () => {
  const [lightningStart, setLightningStart] = useState({ x: 0, y: 0 });
  const [lightningEnd, setLightningEnd] = useState({ x: 0, y: 0 });
  const [showLightning, setShowLightning] = useState(false);
  const lastHoveredRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'React', icon: SimpleIcons.siReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SimpleIcons.siNodedotjs, color: '#339933' },
    { name: 'MongoDB', icon: SimpleIcons.siMongodb, color: '#47A248' },
    { name: 'TypeScript', icon: SimpleIcons.siTypescript, color: '#3178C6' },
    { name: 'Kubernetes', icon: SimpleIcons.siKubernetes, color: '#326CE5' },
    { name: 'AWS', icon: SimpleIcons.siAmazonaws, color: '#FF9900' },
    { name: 'Jenkins', icon: SimpleIcons.siJenkins, color: '#D24939' },
    { name: 'Docker', icon: SimpleIcons.siDocker, color: '#2496ED' },
    { name: 'Shell', icon: SimpleIcons.siGnubash, color: '#4EAA25' },
    { name: 'Linux', icon: SimpleIcons.siLinux, color: '#FCC624' },
    { name: 'CI/CD', icon: SimpleIcons.siGithubactions, color: '#2088FF' }
  ];

  const handleSkillHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      if (lastHoveredRef.current) {
        const lastRect = lastHoveredRef.current.getBoundingClientRect();
        setLightningStart({
          x: lastRect.left - containerRect.left + lastRect.width / 2,
          y: lastRect.top - containerRect.top + lastRect.height / 2
        });
      } else {
        const currentRect = currentTarget.getBoundingClientRect();
        setLightningStart({
          x: currentRect.left - containerRect.left + currentRect.width / 2,
          y: currentRect.top - containerRect.top + currentRect.height / 2
        });
      }

      const currentRect = currentTarget.getBoundingClientRect();
      setLightningEnd({
        x: currentRect.left - containerRect.left + currentRect.width / 2,
        y: currentRect.top - containerRect.top + currentRect.height / 2
      });

      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 800);
      lastHoveredRef.current = currentTarget;
    }
  };

  const generateLightningPath = (variation = 0) => {
    const segments = 5;
    let path = `M ${lightningStart.x} ${lightningStart.y}`;
    
    for (let i = 1; i < segments; i++) {
      const progress = i / segments;
      const y = lightningStart.y + (lightningEnd.y - lightningStart.y) * progress;
      const x = lightningStart.x + (lightningEnd.x - lightningStart.x) * progress;
      const xOffset = (Math.random() - 0.5) * (50 + variation);
      const yOffset = (Math.random() - 0.5) * (20 + variation);
      path += ` L ${x + xOffset} ${y + yOffset}`;
    }
    
    path += ` L ${lightningEnd.x} ${lightningEnd.y}`;
    return path;
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      rotateY: -180
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const iconVariants = {
    hover: {
      scale: [1, 1.2, 1.1],
      rotate: [0, -10, 10, -10, 0],
      filter: [
        'drop-shadow(0 0 0 rgba(0,0,0,0))',
        'drop-shadow(0 0 20px rgba(147, 51, 234, 0.7))'
      ],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  return (
    <section id="skills" className="py-20 text-white overflow-hidden relative">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Technical Skills
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
                  <SkillsSphere />
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* Skills Grid */}
          <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 relative order-1 lg:order-2">
            {/* Lightning Effect */}
            {showLightning && (
              <>
                {/* Main bright core */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ filter: 'drop-shadow(0 0 8px #f0abfc) drop-shadow(0 0 12px #e879f9)' }}
                >
                  <motion.path
                    d={generateLightningPath()}
                    stroke="#f0abfc"
                    strokeWidth="4"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 1, 1, 0],
                      transition: {
                        pathLength: { duration: 0.4, ease: "easeOut" },
                        opacity: { duration: 0.8, times: [0, 0.1, 0.8, 1] }
                      }
                    }}
                  />
                </svg>

                {/* Secondary glow effect */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ filter: 'blur(4px)' }}
                >
                  <motion.path
                    d={generateLightningPath(10)}
                    stroke="#e879f9"
                    strokeWidth="8"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 0.5, 0.5, 0],
                      transition: {
                        pathLength: { duration: 0.4, ease: "easeOut" },
                        opacity: { duration: 0.8, times: [0, 0.1, 0.8, 1] }
                      }
                    }}
                  />
                </svg>

                {/* Outer glow */}
                <svg
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ filter: 'blur(8px)' }}
                >
                  <motion.path
                    d={generateLightningPath(20)}
                    stroke="#d946ef"
                    strokeWidth="12"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: [0, 0.3, 0.3, 0],
                      transition: {
                        pathLength: { duration: 0.4, ease: "easeOut" },
                        opacity: { duration: 0.8, times: [0, 0.1, 0.8, 1] }
                      }
                    }}
                  />
                </svg>
              </>
            )}

            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                custom={index}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: false, margin: "-50px" }}
                variants={cardVariants}
                className="relative bg-gray-700 p-6 rounded-lg text-center transform-gpu cursor-pointer group"
                onMouseEnter={handleSkillHover}
              >
                {/* Icon Container */}
                <div className="relative mb-4">
                  <motion.div
                    variants={iconVariants}
                    className="w-16 h-16 mx-auto"
                    dangerouslySetInnerHTML={{
                      __html: skill.icon.svg.replace(
                        /<svg/g,
                        `<svg fill="${skill.color}"` // Set the `fill` color for the SVG
                      ),
                    }}
                  />
                </div>

                {/* Skill Name */}
                <motion.h3 
                  className="text-lg font-semibold relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  {skill.name}
                </motion.h3>

                {/* Particle Effects on Hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: [0, 1, 0],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity
                    }
                  }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-purple-400 rounded-full"
                      initial={{ 
                        x: "50%",
                        y: "50%",
                        scale: 0
                      }}
                      animate={{
                        x: ["50%", `${50 + (Math.random() * 100 - 50)}%`],
                        y: ["50%", `${50 + (Math.random() * 100 - 50)}%`],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Infinity,
                        repeatDelay: Math.random()
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;