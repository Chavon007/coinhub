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

export const clearCache = () => {
  Object.keys(cacheStore).forEach((key) => delete cacheStore[key]);
};

export const getCacheStats = () => {
  const stats = {};
  Object.keys(cacheStore).forEach((key) => {
    const remaining = cacheStore[key].expiry - Date.now();

    stats[key] = {
      expiresIn: `${Math.floor(remaining / 1000)}s`,
      hasData: !!cacheStore[key].data,
    };
  });

  return stats;
};
