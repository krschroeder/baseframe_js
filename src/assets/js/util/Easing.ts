//from: https://gist.github.com/gre/1650294... inspired by: https://nicmulvaney.com/easing


export type Easings = keyof typeof Easing;
export type EasingFn = (pct: number) => number;

export const easeInOutQuart: EasingFn = (t: number) => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
export const easeInOutCubic: EasingFn = (t: number) => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
export const easeOutQuint: EasingFn = (t: number) => 1+(--t)*t*t*t*t;
export const linear: EasingFn = (t: number): number => t;

const Easing = {
  // no easing, no acceleration
  linear,
  
  // acceleration until halfway, then deceleration 
  easeInOutCubic,

  // acceleration until halfway, then deceleration
  easeInOutQuart,

  // decelerating to zero velocity
  easeOutQuint
}


export default Easing;