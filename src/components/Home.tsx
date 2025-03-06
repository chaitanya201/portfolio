import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

interface HomeProps {
  backgroundY: any;
  opacity: any;
  parallaxY: any;
}

const Home: React.FC<HomeProps> = ({ backgroundY, opacity, parallaxY }) => {
  return (
    <section
      id="home"
      className="min-h-screen  text-white relative overflow-hidden"
    >
      {/* <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white relative overflow-hidden"> */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/random/1920x1080?abstract')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY,
        }}
      />

      <div className="container mx-auto px-4 h-screen flex items-center relative z-10 mt-80 md:mt-0">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: parallaxY }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-6"
            >
              <motion.div>Hi, I'm </motion.div>
              <motion.span className="text-purple-400 inline-block">
                <TypeAnimation
                  sequence={[
                    "Chaitanya Sawant",
                    1000,
                    "DevOps Engineer",
                    1000,
                    "Full Stack Developer",
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  style={{
                    display: "inline-block",
                    color: "#EBD3F8",
                  }}
                  repeat={Infinity}
                />
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl"
            >
              A Full-Stack & DevOps Engineer passionate about building scalable,
              efficient, and user-centric applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/chaitanya201/" },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/im-chaitanya-sawant/",
                  },
                  {
                    icon: Mail,
                    href: "mailto:chaitanyasawant05072001@gmail.com",
                  },
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-purple-400 transition-colors bg-gray-800 rounded-full"
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                      backgroundColor: "#4C1D95",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <item.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative w-full h-[600px] flex items-center justify-center group md:mt-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-purple-600/30 rounded-2xl blur-3xl scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src="/photo.jpeg"
              alt="Hero Image"
              className="w-full h-full object-cover rounded-2xl shadow-2xl relative z-10"
              style={{
                filter: "brightness(0.8) contrast(1.2)",
                transformStyle: "preserve-3d",
                perspective: "1000px",
                objectFit: "contain",
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 15,
                rotateX: 5,
                filter: "brightness(1.1) contrast(1.2)",
                boxShadow: "0 25px 50px -12px rgba(109, 40, 217, 0.5)",
                transition: {
                  duration: 0.4,
                  ease: "easeOut",
                },
              }}
              animate={{
                y: [0, -20, 0],
                rotateZ: [-2, 2, -2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              drag
              dragConstraints={{
                top: -50,
                left: -50,
                right: 50,
                bottom: 50,
              }}
              dragElastic={0.1}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 10 }}
            />
            <motion.div
              className="absolute inset-0 rounded-2xl z-20"
              style={{
                background:
                  "linear-gradient(45deg, rgba(109, 40, 217, 0.2), transparent)",
                pointerEvents: "none",
              }}
              whileHover={{
                background:
                  "linear-gradient(45deg, rgba(109, 40, 217, 0.4), rgba(109, 40, 217, 0.1))",
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;
