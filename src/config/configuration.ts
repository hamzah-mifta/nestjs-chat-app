export default () => ({
  port: process.env.PORT,
  environment: process.env.NODE_ENV || 'development',
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
  database: {
    url: process.env.DATABASE_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION || '1h',
  },
  crypto: {
    saltRounds: parseInt(process.env.CRYPTO_SALT_ROUNDS, 10) || 13,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
  },
  throttle: {
    ttl: parseInt(process.env.THROTTLE_TTL) || 60 * 1000,
    duration: parseInt(process.env.THROTTLE_LIMIT) || 3,
  },
});
