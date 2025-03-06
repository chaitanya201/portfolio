import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Shield, Star, Zap } from "lucide-react";

const Certifications = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const certifications = [
    {
      title: "Kubernetes and Cloud Native Associate (KCNA)",
      issuer: "The Linux Foundation",
      date: "2024",
      score: "95%",
      icon: Shield,
      color: "#326CE5",
      details: [
        "Fundamental Kubernetes concepts including cluster components, control plane, and worker nodes.",
        "Container orchestration, networking (Service, Ingress), and storage (Persistent Volumes, CSI).",
        "Security mechanisms such as RBAC and Network Policies.",
        "Cloud-native technologies like CI/CD pipelines, service meshes, and observability tools.",
      ],
      link: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/73718de1-8b4e-4aaf-b0ff-66772087acad-chaitanya-sujit-sawant-97b23d12-8095-4437-8378-9e5726bd5971-certificate.pdf",
    },
    {
      title: "Certified Kubernetes Application Developer (CKAD)",
      issuer: "The Linux Foundation",
      date: "2024",
      score: "80%",
      icon: Shield,
      color: "#326CE5",
      details: [
        "Developed Kubernetes workloads using Pods, Deployments, ConfigMaps, and Secrets.",
        "Configured persistent storage, network policies, and service discovery with Services and Ingress.",
        "Troubleshooting application issues and setting resource limits (CPU & memory).",
        "Implemented Helm charts for Kubernetes package management.",
      ],
      link: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/73718de1-8b4e-4aaf-b0ff-66772087acad-chaitanya-sujit-sawant-57cacbb9-6b07-42c3-9432-d28c21d2bfd8-certificate.pdf",
    },
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "The Linux Foundation",
      date: "2025",
      score: "81%",
      icon: Shield,
      color: "#326CE5",
      details: [
        "Advanced skills in Kubernetes cluster setup, node management, and troubleshooting.",
        "Configured networking (DNS, CoreDNS, CNI plugins) and managed storage (Persistent Volumes, StatefulSets).",
        "Ensured security using RBAC, Pod Security Policies, and Network Policies.",
        "Implemented monitoring (Prometheus, Grafana), logging (Fluentd, ELK stack), and cluster upgrades.",
      ],
      link: "https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/73718de1-8b4e-4aaf-b0ff-66772087acad-chaitanya-sujit-sawant-5dac89ee-cb97-48fe-8153-809e54df9089-certificate.pdf",
    },
    {
      title: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "2025",
      score: "",
      icon: Star,
      color: "#FF9900",
      details: [
        "Designed highly available, fault-tolerant, and scalable architectures on AWS.",
        "Worked with EC2, S3, RDS, Lambda, and networking concepts like VPC, subnets, and security groups.",
        "Gained expertise in AWS IAM for identity and access management.",
        "Explored database solutions including Aurora and DynamoDB, along with AWS cost optimization techniques.",
      ],
      link: "https://www.udemy.com/certificate/UC-68aec978-8602-427a-b66a-d7e9e338f34f/",
    },
  ];

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
    <section
      id="certifications"
      className="py-20 text-white relative overflow-hidden"
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

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3"
        >
          <Award className="text-purple-400" /> Certifications
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              initial="hidden"
              animate={selectedCard === index ? "visible" : "visible"}
              whileHover={selectedCard === null ? "hover" : ""}
              onClick={() =>
                setSelectedCard(selectedCard === index ? null : index)
              }
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative bg-gray-800/50 backdrop-blur-lg p-4 sm:p-6 rounded-lg transform-gpu cursor-pointer transition-all duration-300
                ${
                  selectedCard === index
                    ? "col-span-1 sm:col-span-2 lg:col-span-2"
                    : ""
                }
                min-h-[280px] sm:min-h-[300px]
              `}
            >
              <AnimatePresence>
                {selectedCard === index ? (
                  // Back of card (Details)
                  <motion.div
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 bg-gray-800/90 backdrop-blur-lg rounded-lg flex flex-col p-4 sm:p-6 overflow-y-auto max-h-[80vh] sm:max-h-none"
                  >
                    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3">
                        <h3 className="text-lg sm:text-xl font-bold text-purple-400 break-words">
                          {cert.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base">
                          {cert.issuer}
                        </p>
                        {cert.score && (
                          <p className="text-base sm:text-lg font-semibold text-purple-300">
                            Score: {cert.score}
                          </p>
                        )}
                      </div>
                      <motion.ul className="space-y-2 sm:space-y-3 list-disc pl-4 text-sm sm:text-base">
                        {cert.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-purple-300"
                          >
                            {detail}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 rounded-lg text-center hover:bg-purple-700 transition-colors text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Certificate
                    </motion.a>
                  </motion.div>
                ) : (
                  // Front of card
                  <motion.div className="h-full flex flex-col justify-between">
                    {/* Icon with Glow Effect */}
                    <motion.div
                      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 relative"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        variants={glowVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute inset-0 bg-purple-600/20 rounded-full"
                      />
                      <cert.icon
                        size="100%"
                        className="relative z-10 w-full h-full"
                        style={{ color: cert.color }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                      <motion.h3
                        className="text-base sm:text-lg font-bold break-words px-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        {cert.title}
                      </motion.h3>
                      <motion.p className="text-gray-400 text-sm">
                        {cert.issuer}
                      </motion.p>
                      <motion.p className="text-purple-400 text-sm">
                        {cert.date}
                      </motion.p>
                      {cert.score && (
                        <motion.div
                          className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                          whileHover={{ scale: 1.1 }}
                        >
                          {cert.score}
                        </motion.div>
                      )}
                    </div>

                    {/* Hover Effects */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-lg"
                      animate={{
                        background:
                          hoveredIndex === index
                            ? "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.2), transparent)"
                            : "none",
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
