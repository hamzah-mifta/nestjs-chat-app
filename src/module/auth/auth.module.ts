import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserRepository } from '../user/repository/user.repository';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ChatModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtService],
  exports: [UserRepository, JwtService],
})
export class AuthModule {}
