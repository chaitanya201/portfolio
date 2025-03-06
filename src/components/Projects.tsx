import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { Environment, PresentationControls, Float } from '@react-three/drei';
import ProjectsScene from './ProjectsScene';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Craft-UI",
      description:
        "A full-stack UI component library similar to ShadCN UI, built with React, Remix, Tailwind CSS, and TypeScript. Backend powered by Node.js, Express.js, Sequelize, and JWT authentication. Deployed on AWS using Docker and Kubernetes.",
      image: "/mern.png",
      link: "https://github.com/chaitanya201/craft-ui",
    },
    {
      id: 2,
      title: "AWS Kubernetes 3-Tier Deployment",
      description:
        "Designed and deployed a scalable 3-tier application on Kubernetes, enabling seamless microservice communication. Used AWS EC2, Ingress Controller, and container orchestration for high availability.",
      image: "/kubeadm-1.png",
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          {/* 3D Scene */}
          <div className="h-[300px] sm:h-[400px] lg:h-[500px] w-full relative">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              className="!touch-none" // Prevent touch events from interfering with scroll
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
                  <ProjectsScene />
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* Projects Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -20,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="bg-gray-800 rounded-lg overflow-hidden transform-gpu w-full max-w-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform transition-transform duration-500"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-semibold mb-2"
                    whileHover={{ x: 10 }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex gap-2">
                    <motion.a
                      whileHover={{ scale: 1.1, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      href={`${project.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-all duration-300"
                    >
                      View Project <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;