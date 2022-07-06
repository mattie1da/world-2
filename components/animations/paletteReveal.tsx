import { gsap } from 'gsap';

export const paletteReveal = (target) => {
  gsap.to(target, {
    opacity: 1,
    delay: 0.5,
    duration: 1
  });
};
