import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res() res: Response,
    @Headers('socket-id') socketId: string,
    @Body() payload: LoginDto,
  ) {
    const result = await this.authService.login(socketId, payload);
    return res.status(result.statusCode).json(result);
  }

  @Post('register')
  async register(@Res() res: Response, @Body() payload: RegisterDto) {
    const result = await this.authService.register(payload);
    return res.status(result.statusCode).json(result);
  }
}
