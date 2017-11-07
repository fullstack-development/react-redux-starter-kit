/**
 * Emulates calls to the next() of the generator
 * @param gen Generator
 * @param stepCount The number of call gen.next()
 * @param args Dictionary of arguments passed to gen.next(). Key of dictionary is a call number
 */
export function runGenerator<T>(
  gen: IterableIterator<T>, stepCount: number, args: { [key: string]: any } = {},
): IterableIterator<T> {
  if (stepCount < 1) {
    throw new Error('countMustBeGreaterThanOne');
  }

  let currentStep: number = 1;
  while (currentStep <= stepCount) {
    gen.next(args[currentStep]);
    currentStep++;
  }

  return gen;
}
