import React from 'react';
import Globe from './Globe';
import Background from './Background';
import ContactForm from './ContactForm';

const ContactSection = () => {
  return (
    <div className="bg-dark text-white">
      <Background />
      <Globe />
      <ContactForm />
    </div>
  );
};

export default ContactSection;
