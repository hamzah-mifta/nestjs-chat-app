import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerLimitDetail,
} from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    throw new ThrottlerException('Too many request.');
  }
}
