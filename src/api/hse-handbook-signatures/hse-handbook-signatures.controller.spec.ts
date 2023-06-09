import { Test, TestingModule } from '@nestjs/testing';
import { HseHandbookSignaturesController } from './hse-handbook-signatures.controller';
import { HseHandbookSignaturesService } from './hse-handbook-signatures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HseHandbookSignature } from './entities/hse-handbook-signature.entity';
import { User } from '../users/entities/user.entity';
import { HseHandbook } from '../hse-handbook/entities/hse-handbook.entity';
import { EmailService } from '../email/email.service';
import { DataSource } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';

describe('HseHandbookSignaturesController', () => {
  let controller: HseHandbookSignaturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseHandbookSignaturesController],
      providers: [
        HseHandbookSignaturesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }, {
          provide: getRepositoryToken(HseHandbookSignature),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(User),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(HseHandbook),
          useValue: jest.fn()
        },
        {
          provide: EmailService,
          useFactory: () => ({ send: jest.fn() })
        },
        {
          provide: S3Service,
          useFactory: () => ({ uploadFile: jest.fn() })
        },
        {
          provide: ConfigService,
          useFactory: () => ({ get: jest.fn() })
        }
      ],
    }).compile();

    controller = module.get<HseHandbookSignaturesController>(HseHandbookSignaturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
