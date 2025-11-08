/**
 * Animation Constants
 * Animation timing and easing functions
 */

export const animations = {
  timing: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
  easing: {
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    linear: "linear",
  },
} as const;

