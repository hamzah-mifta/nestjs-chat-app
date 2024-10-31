import { Injectable } from '@nestjs/common';
import { CryptoUtil } from 'src/common/utils/crypto.utils';
import { UserRepository } from '../user/user.repository';
import { RegisterDto } from '../user/dtos/register.dto';
import {
  CreatedResponse,
  HttpResponse,
  SuccessResponse,
} from 'src/common/utils/response.util';
import * as moment from 'moment';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from 'src/common/utils/error.utils';
import { captureError } from 'src/common/utils/sentry.utils';
import { Logger } from 'src/common/utils/logger.utils';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private cryptoUtil = new CryptoUtil();
  private logger = new Logger();

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<HttpResponse> {
    try {
      const { email, password } = loginDto;

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return new UnauthorizedError('Invalid credentials');
      }

      const isPasswordValid = await this.cryptoUtil.comparePassword(
        password,
        user.password,
      );
      if (!isPasswordValid) {
        return new UnauthorizedError('Invalid credentials');
      }

      const payload = {
        email: user.email,
        username: user.username,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      const responseData = {
        accessToken,
      };

      return new SuccessResponse(responseData, 'User logged in successfully');
    } catch (error) {
      this.logger.error(error.message, error.stack);

      captureError(error, 'AuthService:login', {
        ...loginDto,
        password: 'secret',
      });

      return new InternalServerError(error.message);
    }
  }

  async register(registerDto: RegisterDto): Promise<HttpResponse> {
    try {
      const isExist = await this.userRepository.isEmailOrUsernameExist(
        registerDto.email,
        registerDto.username,
      );

      if (isExist) {
        return new BadRequestError('Username or email already taken');
      }

      const hashedPassword = await this.cryptoUtil.hashPassword(
        registerDto.password,
      );

      const registeredUser = await this.userRepository.create({
        ...registerDto,
        password: hashedPassword,
        createdAt: moment().unix(),
      });

      return new CreatedResponse(
        { email: registeredUser.email, username: registeredUser.username },
        'User registered successfully',
      );
    } catch (error) {
      this.logger.error(error.message, 'AuthService:register');

      captureError(error, 'AuthService:register', {
        ...registerDto,
        password: 'secret',
      });

      return new InternalServerError(error.message);
    }
  }
}
