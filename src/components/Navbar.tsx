import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import DownloadCV from "./DownloadCV";
import { useNavigate } from "@tanstack/react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightningStart, setLightningStart] = useState({ x: 0, y: 0 });
  const [lightningEnd, setLightningEnd] = useState({ x: 0, y: 0 });
  const [showLightning, setShowLightning] = useState(false);
  const lastClickedRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 0.9)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "More About Me", href: "about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Certifications", href: "#certifications" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    index: number
  ) => {
    navigate({ to: `/${href}` });

    e.preventDefault();
    const element = document.querySelector(href);
    const currentTarget = e.currentTarget;

    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      const navContainer = document.querySelector(".nav-container");
      const containerRect = navContainer?.getBoundingClientRect();

      if (containerRect) {
        if (lastClickedRef.current) {
          const lastRect = lastClickedRef.current.getBoundingClientRect();
          setLightningStart({
            x: lastRect.left - containerRect.left + lastRect.width / 2,
            y: lastRect.top - containerRect.top + lastRect.height / 2,
          });
        } else {
          setLightningStart({
            x:
              currentTarget.getBoundingClientRect().left -
              containerRect.left +
              currentTarget.getBoundingClientRect().width / 2,
            y: currentTarget.getBoundingClientRect().top - containerRect.top,
          });
        }

        setLightningEnd({
          x:
            currentTarget.getBoundingClientRect().left -
            containerRect.left +
            currentTarget.getBoundingClientRect().width / 2,
          y:
            currentTarget.getBoundingClientRect().top -
            containerRect.top +
            currentTarget.getBoundingClientRect().height / 2,
        });
      }

      setShowLightning(true);
      setTimeout(() => setShowLightning(false), 800);

      lastClickedRef.current = currentTarget;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const generateLightningPath = (variation = 0) => {
    const segments = 5;
    let path = `M ${lightningStart.x} ${lightningStart.y}`;

    for (let i = 1; i < segments; i++) {
      const progress = i / segments;
      const y =
        lightningStart.y + (lightningEnd.y - lightningStart.y) * progress;
      const x =
        lightningStart.x + (lightningEnd.x - lightningStart.x) * progress;
      const xOffset = (Math.random() - 0.5) * (50 + variation);
      const yOffset = (Math.random() - 0.5) * (20 + variation);
      path += ` L ${x + xOffset} ${y + yOffset}`;
    }

    path += ` L ${lightningEnd.x} ${lightningEnd.y}`;
    return path;
  };

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Backdrop blur overlay */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[65px] bg-gray-900/50 backdrop-blur-md z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.nav
        style={{ backgroundColor }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "py-2 shadow-lg" : "py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <motion.div>
              <DownloadCV />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 nav-container relative">
              {showLightning && (
                <>
                  {/* Main bright core */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{
                      filter:
                        "drop-shadow(0 0 8px #f0abfc) drop-shadow(0 0 12px #e879f9)",
                    }}
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
                          opacity: { duration: 0.8, times: [0, 0.1, 0.8, 1] },
                        },
                      }}
                    />
                  </svg>

                  {/* Secondary glow effect */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ filter: "blur(4px)" }}
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
                          opacity: { duration: 0.8, times: [0, 0.1, 0.8, 1] },
                        },
                      }}
                    />
                  </svg>

                  {/* Outer glow */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ filter: "blur(8px)" }}
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
                          opacity: { duration: 0.8, times: [0, 0.1, 0.8, 1] },
                        },
                      }}
                    />
                  </svg>
                </>
              )}
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`/${item.href}`}
                  className="text-white hover:text-purple-400 transition-colors relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleNavClick(e, item.href, index)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="" size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={menuVariants}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-64 bg-gray-900/95 backdrop-blur-lg shadow-lg p-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden text-white absolute right-0 top-0 p-4"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="" size={24} /> : <Menu size={24} />}
            </motion.button>
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-purple-400 transition-colors"
                  whileHover={{ x: 10 }}
                  onClick={(e) => handleNavClick(e, item.href, index)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
