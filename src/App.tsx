import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Home from "./components/Home";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Background3D from "./components/Background3D";
import Background from "./components/Background";
import AboutMe from "./components/AboutMe";
import Certifications from "./components/Certifications";

function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const [showBackground, setShowBackground] = useState(false);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -150]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("home");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setShowBackground(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Background />
      <Background3D />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <div>
        <Home
          backgroundY={backgroundY}
          opacity={opacity}
          parallaxY={parallaxY}
        />

        <div className="relative z-10">
          <AboutMe />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Achievements />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
