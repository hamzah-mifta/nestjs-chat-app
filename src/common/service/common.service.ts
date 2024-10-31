import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuccessResponse } from '../utils/response.util';
import { InternalServerError } from '../utils/error.utils';

@Injectable()
export class CommonService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  // upload file to S3
  async upload(fileName: string, file: Buffer) {
    const bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');

    try {
      const result = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: file,
        }),
      );

      return new SuccessResponse(result);
    } catch (error) {
      return new InternalServerError(error.message);
    }
  }
}
