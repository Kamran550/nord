import {
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
  S3ClientConfig
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  private s3: S3Client;
  private secretAccessKey: string;
  private accessKeyId: string;

  constructor(private configService: ConfigService) {
    this.region = configService.get<string>('S3_REGION');
    this.secretAccessKey = configService.get<string>('S3_SECRET_ACCESS_KEY');
    this.accessKeyId = configService.get<string>('S3_ACCESS_KEY_ID');
    const config: S3ClientConfig = { region: this.region, };
    if (this.configService.get('ENV', 'dev') === 'dev') {
      config.credentials = {
        secretAccessKey: this.secretAccessKey,
        accessKeyId: this.accessKeyId
      };
    }
    this.s3 = new S3Client(config);
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'private'
    };
    try {
      const response: PutObjectCommandOutput = await this.s3.send(new PutObjectCommand(input));
      if (response.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new Error('Image not saved to s3!');
    } catch (err) {
      this.logger.error('Cannot save file inside s3', err);
      throw err;
    }
  }

  async getFile(key: string) {
    if (!key) return null;

    const bucket = this.configService.get<string>('S3_BUCKET');
    const response = await this.s3.send(new GetObjectCommand({
      Bucket: bucket,
      Key: key
    }));

    const byteArray = await response.Body.transformToByteArray();
    return `data:image/png;base64, ${Buffer.from(byteArray).toString('base64')}`;
  }
}
