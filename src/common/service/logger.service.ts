import { Injectable } from '@nestjs/common';
import { WinstonLogger } from '../utils/logger.utils';

@Injectable()
export class LoggerService {
  private logger = WinstonLogger;

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - Trace: ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
