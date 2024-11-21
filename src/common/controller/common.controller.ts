import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from '../service/common.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: /^image\/(png|jpeg|jpg)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const user = req['user'];
    const result = await this.commonService.upload(user, file);

    return res.status(HttpStatus.OK).json(result);
  }
}
