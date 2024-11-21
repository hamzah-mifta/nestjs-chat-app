import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuccessResponse } from '../utils/response.util';
import { InternalServerError } from '../utils/error.utils';
import { CryptoUtil } from '../utils/crypto.utils';
import { JWTPayload } from '../dtos/jwt-payload.dto';
import { ACL_PUBLIC_READ } from 'src/constant/file-upload';

@Injectable()
export class CommonService {
  private readonly cryptoUtil = new CryptoUtil();
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  // upload file to S3
  async upload(user: JWTPayload, file: Express.Multer.File) {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const region = this.configService.get<string>('AWS_REGION');

    try {
      const userId = user.id;

      const hashedFilename = this.cryptoUtil.hashFileContent(file.buffer);
      const fileExtension = file?.originalname?.split('.').pop();

      const filename = `images/profiles/${userId}/${hashedFilename}.${fileExtension}`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: filename,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: ACL_PUBLIC_READ,
        }),
      );

      return new SuccessResponse({
        url: `https://${bucketName}.s3.${region}.amazonaws.com/${filename}`,
      });
    } catch (error) {
      return new InternalServerError(error.message);
    }
  }
}
