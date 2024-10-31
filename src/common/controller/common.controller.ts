import {
  Controller,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from '../service/common.service';
import { Response } from 'express';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/png' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.commonService.upload(
      file.originalname,
      file.buffer,
    );

    return res.status(HttpStatus.OK).json(result);
  }
}
