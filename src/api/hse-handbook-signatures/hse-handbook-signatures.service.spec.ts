import { Test, TestingModule } from '@nestjs/testing';
import { HseHandbookSignaturesService } from './hse-handbook-signatures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { HseHandbook } from '../hse-handbook/entities/hse-handbook.entity';
import { HseHandbookSignature } from './entities/hse-handbook-signature.entity';
import { EmailService } from '../email/email.service';
import { DataSource } from 'typeorm';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';

describe('HseHandbookSignaturesService', () => {
  let service: HseHandbookSignaturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<HseHandbookSignaturesService>(HseHandbookSignaturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
