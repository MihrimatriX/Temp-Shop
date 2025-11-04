"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

// Common animation variants
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Animation components
interface AnimatedDivProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  duration?: number;
}

export const AnimatedDiv = ({ 
  children, 
  variants = fadeInUp, 
  className = "",
  delay = 0,
  duration = 0.3
}: AnimatedDivProps) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedList = ({ children, className = "" }: AnimatedListProps) => (
  <motion.div
    variants={staggerContainer}
    initial="initial"
    animate="animate"
    className={className}
  >
    {children}
  </motion.div>
);

interface AnimatedListItemProps {
  children: ReactNode;
  className?: string;
}

export const AnimatedListItem = ({ children, className = "" }: AnimatedListItemProps) => (
  <motion.div
    variants={staggerItem}
    className={className}
  >
    {children}
  </motion.div>
);

// Hover animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};

export const hoverLift = {
  whileHover: { y: -5 },
  transition: { duration: 0.2 }
};

export const hoverGlow = {
  whileHover: { 
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" 
  },
  transition: { duration: 0.3 }
};

// Loading animations
export const pulseAnimation = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Page transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeInOut" }
};

// Modal animations
export const modalAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Toast animations
export const toastAnimation = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 0.9 },
  transition: { duration: 0.3, ease: "easeOut" }
};

// Card animations
export const cardHover = {
  whileHover: { 
    y: -5,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
  },
  transition: { duration: 0.2, ease: "easeOut" }
};

// Button animations
export const buttonTap = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 }
};

// Image animations
export const imageLoad = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Text animations
export const textReveal = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Progress animations
export const progressFill = {
  initial: { width: "0%" },
  animate: { width: "100%" },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Stagger animations for grids
export const gridStagger = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
};

// Custom hook for animations
export const useAnimation = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const slideIn = (direction: "left" | "right" | "up" | "down") => {
    const directions = {
      left: { x: -20 },
      right: { x: 20 },
      up: { y: -20 },
      down: { y: 20 }
    };

    return {
      initial: { opacity: 0, ...directions[direction] },
      animate: { opacity: 1, x: 0, y: 0 },
      exit: { opacity: 0, ...directions[direction] }
    };
  };

  return { fadeInUp, slideIn };
};
