import { gsap } from 'gsap';

export const listItemReveal = (target) => {
  gsap.from(target, {
    scrollTrigger: {
      trigger: target,
      start: 'top 90%'
    },
    stagger: 0.2,
    y: 20,
    opacity: 0
  });
};
