import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../user/dtos/register.dto';
import { Response } from 'express';
import { LoginDto } from './dtos/login.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(payload);
    return res.status(result.statusCode).json(result);
  }

  @Post('register')
  async register(@Body() payload: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(payload);
    return res.status(result.statusCode).json(result);
  }
}
