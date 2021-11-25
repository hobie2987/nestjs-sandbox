// import * as rxjs from 'rxjs';

/**
 * Promise that resolves after the provide time in milliseconds
 * @param ms
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function retry(executor: any, retries = 3): Promise<any> {
  return executor.catch((error) =>
    retries > 0 ? retry(--retries, executor) : Promise.reject(error),
  );
}

// type PromiseExecutor<T> = ((value?: T | PromiseLike<T>) => void, (reason?: any) => void) => void;
// type onfullfilled<T> = (value?: T | PromiseLike<T>) => void;
// type onrejected = (reason?: any) => void;
// if (!count) return Promise.reject(new Error(`Exceeded retry: ${count}`));
// return func().catch(() => retry(func, --count));
