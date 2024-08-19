import React from 'react';
import { motion } from 'framer-motion';

const FlipText = ({ label }) => {
  return (
    <motion.span
      initial={{ rotateX: 0, color: "#ffffff" }}
      whileHover={{
        rotateX: 360,
        color: "#08f9ff",
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        perspective: 500,
      }}
    >
      {label}
    </motion.span>
  );
};

export default FlipText;
