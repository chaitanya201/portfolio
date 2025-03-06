import { motion } from "framer-motion";
import { useState } from "react";

type MotionButtonProps = {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const MotionButton: React.FC<MotionButtonProps> = ({ text, onClick }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <motion.button
      onClick={(e) => {
        setClicked(true);
        onClick?.(e);
        setTimeout(() => setClicked(false), 300);
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
      }}
      whileTap={{ scale: 0.9 }}
      animate={{
        rotateX: clicked ? 10 : 0,
        rotateY: clicked ? -10 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="relative px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold shadow-md outline-none border-none overflow-hidden"
    >
      {text}
      {/* Ripple effect */}
      {clicked && (
        <motion.span
          className="absolute inset-0 bg-white opacity-20 rounded-xl"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}
    </motion.button>
  );
};

export default MotionButton;
