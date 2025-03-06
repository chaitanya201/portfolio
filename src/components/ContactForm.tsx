import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formValid, setFormValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation logic
    if (!email || !message) {
      setFormValid(false);
    } else {
      // handle form submission
    }
  };

  return (
    <div className=" transform translate-x-full transition-transform duration-500 ease-in-out hover:translate-x-0">
      <form onSubmit={handleSubmit} className="bg-dark p-5 rounded-lg shadow-lg text-white w-80">
        <label className="block text-lg mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-2 mb-4 border ${formValid ? "border-gray-700" : "border-red-500"} rounded-lg`}
        />
        <label className="block text-lg mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`w-full p-2 mb-4 border ${formValid ? "border-gray-700" : "border-red-500"} rounded-lg`}
        />
        <button type="submit" className="w-full bg-neon text-black p-2 rounded-lg">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
