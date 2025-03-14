import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Modal from "./Modal";
import MotionButton from "./MotionButton";

const DownloadCV = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger CV download
    const link = document.createElement("a");
    link.href = "/cv.pdf"; // Replace with actual CV file path
    link.download = "Chaitanya_Sawant_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show pop-up message
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 10000);

    // Confetti Explosion 🎉
    confetti({
      particleCount: 400,
      spread: 90,
      origin: { y: 0.6 },
      startVelocity: 50,
      decay: 0.9,
      gravity: 0.5,
    });
  };

  return (
    <div className="relative flex flex-col items-center">
      <MotionButton text="🚀 Download CV" onClick={handleDownload} />
      {/* Sci-Fi Pop-up Message */}
      {showPopup && <Modal onClose={() => setShowPopup(false)} />}

      {/* Keyframes for animations */}
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          position: absolute;
          width: 100px;
          height: 100px;
          background: rgba(59, 130, 246, 0.6);
          border-radius: 50%;
          animation: ripple 0.6s linear;
        }
        .animate-glow {
          box-shadow: 0 0 15px #3b82f6, 0 0 30px #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default DownloadCV;
