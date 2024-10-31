import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHello(@Res() res: Response) {
    const result = this.appService.getHealth();
    return res.status(result.statusCode).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/auth-check')
  getAuthCheck(@Res() res: Response) {
    return res.status(200).json({ success: true });
  }

  @Get('/debug-sentry')
  getError() {
    throw new Error(`Test sentry error ${new Date()}`);
  }
}
