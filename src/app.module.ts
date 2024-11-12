import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { SentryModule } from '@sentry/nestjs/setup';
import configuration from './config/configuration';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CommonModule } from './common/module/common.module';
import { CommonController } from './common/controller/common.controller';
import { CommonService } from './common/service/common.service';
import { LoggerService } from './common/service/logger.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { UserModule } from './module/user/user.module';
import { AuthService } from './module/auth/auth.service';
import { AuthController } from './module/auth/auth.controller';
import { AuthModule } from './module/auth/auth.module';
import { ChatModule } from './module/chat/chat.module';
import { ChatService } from './module/chat/chat.service';

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
    CommonModule,
    UserModule,
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController, AuthController, CommonController],
  providers: [
    AppService,
    JwtAuthGuard,
    JwtStrategy,
    LoggerService,
    CommonService,
    AuthService,
    ChatService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
  exports: [LoggerService, JwtAuthGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
