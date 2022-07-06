import { gsap } from 'gsap';

export const articleReveal = (target) => {
  gsap.from(target, {
    scrollTrigger: {
      trigger: target,
      end: 'top 40%',
      start: 'top 100%',
      scrub: true
    },
    y: 50,
    opacity: 0
  });
};
