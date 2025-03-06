import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ContactSphere } from './ContactSphere';
import { Environment, Float, PresentationControls } from '@react-three/drei';
import { Send, Mail, Phone, MapPin ,Linkedin} from 'lucide-react';

const Contact = () => {
  const [activeSection, setActiveSection] = useState('form');
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormState({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'chaitanyasawant05072001@gmail.com',
      link: 'mailto:chaitanyasawant05072001@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 95036 88182',
      link: 'tel:+919503688182'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'im-chaitanya-sawant',
      link: 'https://www.linkedin.com/in/im-chaitanya-sawant/'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Pune, India',
      link: 'https://www.google.com/maps/place/Pune,+Maharashtra/@18.5229426,73.8622652,12z'
    }
  ];

  return (
    <section id="contact" className=" py-20 text-white relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundImage: "radial-gradient(circle at center, purple 0%, transparent 50%)",
          backgroundSize: "100% 100%"
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-center"
        >
          Get in Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D Interactive Element */}
          <div className="h-[500px] relative">
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
                  <ContactSphere />
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* Contact Form and Info */}
           

            {/* Contact Information */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-lg text-center group w-full"
                >
                  <div className="flex flex-col items-center gap-2 overflow-hidden">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="p-3 bg-purple-600/20 rounded-full group-hover:bg-purple-600/30 transition-colors"
                    >
                      <info.icon className="w-6 h-6 text-purple-400" />
                    </motion.div>
                    <h3 className="font-medium">{info.title}</h3>
                    <p className="text-sm text-gray-400 break-all">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
};

export default Contact;
