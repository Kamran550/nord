import { Module } from '@nestjs/common';
import { HseHandbookSignaturesService } from './hse-handbook-signatures.service';
import { HseHandbookSignaturesController } from './hse-handbook-signatures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HseHandbookSignature } from './entities/hse-handbook-signature.entity';
import { User } from '../users/entities/user.entity';
import { HseHandbook } from '../hse-handbook/entities/hse-handbook.entity';
import { EmailModule } from '../email/email.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([HseHandbookSignature, User, HseHandbook]),
    EmailModule,
    S3Module,
  ],
  controllers: [HseHandbookSignaturesController],
  providers: [HseHandbookSignaturesService],
  exports: [HseHandbookSignaturesService]
})
export class HseHandbookSignaturesModule {}
