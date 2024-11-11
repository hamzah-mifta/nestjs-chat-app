import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Put(':id/profile')
  async updateProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() payload: UpdateProfileDto,
  ) {
    if (!id || id === ':id') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "'id' is required",
      });
    }

    const result = await this.userService.updateProfile(id, payload);
    return res.status(result.statusCode).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    if (!id || id === ':id') {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "'id' is required",
      });
    }

    const result = await this.userService.getProfile(id);
    return res.status(result.statusCode).json(result);
  }
}
