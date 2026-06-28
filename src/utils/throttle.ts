// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const throttle = <T extends (...args: any[]) => void>(fn: T, delay: number): T => {
  let lastCall = 0;

  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  } as T;
};
