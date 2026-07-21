export const asyncHandler = (fn: Function) => {
  return (...args: any[]) => {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
};
