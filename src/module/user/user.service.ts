import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CryptoUtil } from 'src/common/utils/crypto.utils';

@Injectable()
export class UserService {
  private cryptoUtil = new CryptoUtil();

  constructor(private readonly userRepository: UserRepository) {}
}
