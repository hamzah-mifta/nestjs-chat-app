import { Module } from '@nestjs/common';
import { CommonController } from '../controller/common.controller';
import { CommonService } from '../service/common.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { limiterOptions } from 'src/constant/rate-limiter';

@Module({
  imports: [ThrottlerModule.forRoot(limiterOptions)],
  controllers: [CommonController],
  providers: [
    CommonService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class CommonModule {}
