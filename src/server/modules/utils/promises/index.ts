export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function retry(func: any, count = 3, err: Error = null): Promise<any> {
  if (!count) return Promise.reject(err);
  return func().catch((err) => retry(func, count - 1, err));
}
