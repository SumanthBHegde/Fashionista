import { APP_CONFIG } from "./app-config";

export const transition = {
  type: "spring",
  duration: 1.2,
  ease: "easeInOut",
};

export const slideAnimation = (direction) => {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.3 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0.1 },
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const fadeAnimation = {
  initial: {
    opacity: 0,
    scale: 0.95,
    transition: { ...transition, delay: 0.2 },
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { ...transition, delay: 0 },
  },
};

export const logoAnimation = {
  initial: {
    scale: 0.8,
    opacity: 0,
    rotate: -10,
  },
  animate: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      duration: 0.8,
      delay: 0.2,
    },
  },
};

export const headTextAnimation = {
  initial: {
    y: 50,
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: "spring",
    damping: 8,
    stiffness: 50,
    duration: 1,
    delay: 0.4,
  },
};

export const subtitleAnimation = {
  initial: {
    y: 30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    type: "spring",
    damping: 8,
    stiffness: 50,
    duration: 0.8,
    delay: 0.6,
  },
};

export const contentAnimation = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
  transition: {
    type: "spring",
    damping: 8,
    stiffness: 40,
    duration: 0.8,
    delay: 0.8,
  },
};

export const buttonAnimation = {
  initial: {
    y: 30,
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: "spring",
    damping: 8,
    stiffness: 60,
    duration: 0.6,
    delay: 1.0,
  },
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const headContainerAnimation = {
  initial: {
    x: -50,
    opacity: 0,
    transition: { ...transition, delay: 0.3 },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ...transition,
      delay: 0.2,
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    x: -50,
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};
