const SHORT = 'short';
const MEDIUM = 'medium';
const LONG = 'long';

export const shortLimiter = {
  name: SHORT,
  ttl: 1000,
  limit: 3,
};

export const mediumLimiter = {
  name: MEDIUM,
  ttl: 10 * 1000,
  limit: 20,
};

export const longLimiter = {
  name: LONG,
  ttl: 60 * 1000,
  limit: 100,
};

export const limiterOptions = [shortLimiter, mediumLimiter, longLimiter];
