class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
    this.queue = [];
    this.processing = false;
  }

  async execute(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      this.requests = this.requests.filter(
        (time) => now - time < this.timeWindow
      );

      if (this.requests.length >= this.maxRequests) {
        const oldestRequest = this.requests[0];
        const waitTime = this.timeWindow - (now - oldestRequest);

        await new Promise((resolve) => setTimeout(resolve, waitTime + 100));
        continue;
      }
      const { fn, resolve, reject } = this.queue.shift();
      this.requests.push(Date.now());

      try {
        const result = await fn();
        resolve(result);
      } catch (err) {
        reject(err);
      }

      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    this.processing = false;
  }
}

export const coinGeckoLimiter = new RateLimiter(10, 60000);
export const cryptoPanicLimiter = new RateLimiter(10, 60000);
export const groqLimiter = new RateLimiter(30, 60000);
