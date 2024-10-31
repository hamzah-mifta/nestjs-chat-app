import * as morgan from 'morgan';
import { WinstonLogger } from '../utils/logger.utils';

export const loggerMiddleware = morgan('combined', {
  stream: {
    write: (message: string) => {
      WinstonLogger.info(message.trim());
    },
  },
});
