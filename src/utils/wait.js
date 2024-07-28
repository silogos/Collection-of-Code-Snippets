export default function wait(timeout = 500) {
  return new Promise((res) => setTimeout(res, timeout));
}
