/* https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html */
interface ICancellablePromise<T> {
  promise: Promise<T>;
  cancel(): void;
}

const makeCancelable = <T>(promise: Promise<T>): ICancellablePromise<T> => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
      error => hasCanceled_ ? reject({ isCanceled: true }) : reject(error),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export { ICancellablePromise, makeCancelable };
