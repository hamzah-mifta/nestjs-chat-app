import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SentryModule } from '@sentry/nestjs/setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { AuthService } from './module/auth/auth.service';
import { AuthController } from './module/auth/auth.controller';
import { AuthModule } from './module/auth/auth.module';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { LoggerService } from './common/service/logger.service';
import { CommonController } from './common/controller/common.controller';
import { CommonService } from './common/service/common.service';
import { CommonModule } from './common/module/common.module';
import configuration from './config/configuration';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    SentryModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRATION'),
          },
        };
      },
    }),
    AuthModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController, AuthController, CommonController],
  providers: [
    AppService,
    AuthService,
    CommonService,
    JwtAuthGuard,
    JwtStrategy,
    LoggerService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
  exports: [LoggerService, JwtAuthGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
