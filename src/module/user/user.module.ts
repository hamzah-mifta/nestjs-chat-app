import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Profile, ProfileSchema } from './schema/profile.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { ProfileRepository } from './repository/profile.repository';
import { LoggerService } from 'src/common/service/logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ProfileRepository, LoggerService],
  exports: [],
})
export class UserModule {}
