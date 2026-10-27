import gsap from 'gsap';

/**
 * quickSetter for uniform scale. Passing 'scale' to gsap.quickSetter makes
 * Safari call setAttribute('scaleX,scaleY') and throw, so set both axes.
 */
export const quickScale = (target: gsap.TweenTarget) => {
  const x = gsap.quickSetter(target, 'scaleX');
  const y = gsap.quickSetter(target, 'scaleY');
  return (value: number) => {
    x(value);
    y(value);
  };
};
