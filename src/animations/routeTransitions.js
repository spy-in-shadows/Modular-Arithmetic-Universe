export const routeTransition = {
  initial: { opacity: 0, filter: 'blur(14px)', scale: 1.02 },
  animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
  exit: { opacity: 0, filter: 'blur(14px)', scale: 0.985 },
};
