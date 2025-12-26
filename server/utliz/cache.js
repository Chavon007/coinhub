const cacheStore = {};

export const setCache = (key, data, duration = 60000) => {
  cacheStore[key] = {
    data,
    expiry: Date.now() + duration,
  };
};

export const getCache = (key) => {
  const cached = cacheStore[key];
  if (!cached) return null;

  if (Date.now() > cached.expiry) {
    delete cacheStore[key];
    return null;
  }

  return cached.data;
};
