export default async function tryCatch({
  func = () => {},
  maxTry = 3,
  delay = 500,
  startDelay = 0,
}) {
  let retryCount = 0;

  async function retry() {
    try {
      await wait(startDelay);
      const res = await func();
      return res;
    } catch (error) {
      retryCount += 1;
      if (retryCount >= maxTry) {
        throw error;
      }

      await wait(delay);
      return retry();
    }
  }

  return await retry();
}
