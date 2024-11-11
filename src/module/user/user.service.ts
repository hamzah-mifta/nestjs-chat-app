import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { ProfileRepository } from './repository/profile.repository';
import { LoggerService } from 'src/common/service/logger.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from 'src/common/utils/error.utils';

import { SuccessResponse } from 'src/common/utils/response.util';
import { captureError } from 'src/common/utils/sentry.utils';
import { getUnixTimestamp } from 'src/common/utils/date.utils';
import { Profile } from './schema/profile.schema';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private logger: LoggerService,
  ) {}

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    if (!userId) {
      return new BadRequestError('"id" is required');
    }

    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        return new NotFoundError('User not found');
      }

      const profileId = user.profile ? user.profile.toString() : null;

      let profile: Profile;
      if (profileId) {
        profile = await this.profileRepository.updateById(profileId, {
          ...updateProfileDto,
          updatedAt: getUnixTimestamp(),
        });
      } else {
        profile = await this.profileRepository.create({
          ...updateProfileDto,
          createdAt: getUnixTimestamp(),
        });
      }

      await this.userRepository.updateById(user._id.toString(), {
        profile: profile._id,
        updatedAt: getUnixTimestamp(),
      });

      return new SuccessResponse(profile, 'User profile updated successfully');
    } catch (error) {
      this.logger.error(error.message, error.stack);

      captureError(error, 'UserService:updateProfile', {
        userId,
        updateProfileDto,
      });

      return new InternalServerError(error.message);
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this.userRepository.findWithProfileById(userId);
      if (!user) {
        return new NotFoundError('User not found');
      }

      return new SuccessResponse(user, 'User profile updated successfully');
    } catch (error) {
      this.logger.error(error.message, error.stack);

      captureError(error, 'UserService:getProfile', {
        userId,
      });

      return new InternalServerError(error.message);
    }
  }
}
