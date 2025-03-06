import { motion } from "framer-motion";

interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", damping: 15 }}
        className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-50 blur-xl" />

        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 min-w-[400px]">
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 text-cyan-500 hover:text-cyan-400"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>

          {/* Modal content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-2xl">🌟</span>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">
                Thank You for This Opportunity!
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-slate-300 leading-relaxed"
              >
                <p className="mb-4">
                  I am truly grateful for this opportunity to showcase my skills
                  and passion for development.
                </p>
                <p className="text-cyan-400 font-semibold">
                  I can't wait to collaborate and deliver outstanding results!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-4"
              >
                <div className="flex justify-center gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold 
                         hover:from-cyan-600 hover:to-purple-600 transition-colors"
              onClick={onClose}
            >
              Let's Begin
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
