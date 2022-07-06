import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const widgetsReveal = (target) => {
  const widgetsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      end: 'bottom 100%',
      start: 'top 100%'
    }
  });

  ScrollTrigger.matchMedia({
    'min-width: 850px': function () {
      widgetsTimeline.from(target, {
        opacity: 0,
        y: 100,
        rotate: -10,
        stagger: 0.25
      });
    }
  });
};
