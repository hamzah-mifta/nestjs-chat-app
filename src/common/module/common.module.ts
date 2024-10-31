import { Module } from '@nestjs/common';
import { CommonController } from '../controller/common.controller';
import { CommonService } from '../service/common.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL'),
          limit: config.get<number>('THROTTLE_LIMIT'),
        },
      ],
    }),
  ],
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
