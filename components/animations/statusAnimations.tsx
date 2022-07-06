import { gsap } from 'gsap';

export const onlineAnimation = (target) => {
  gsap.to(target, {
    duration: 0.4,
    ease: 'power2.inOut',
    height: 15,
    stagger: {
      each: 0.1,
      from: 'center',
      repeat: -1,
      yoyo: true
    }
  });
};

export const offlineAnimation = (target) => {
  gsap.from(target, {
    duration: 1.2,
    opacity: 0,
    y: '10',
    stagger: {
      each: 0.1,
      repeat: -1,
      yoyo: true
    },
    yoyo: true,
    repeat: -1
  });
};
