import { Test, TestingModule } from '@nestjs/testing';
import { HseHandbookController } from './hse-handbook.controller';
import { HseHandbookService } from './hse-handbook.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';
import { AssignedHseRisk } from '../assigned-hse-risks/entities/assigned-hse-risk.entity';
import { AssignedHseRoutine } from '../assigned-hse-routines/entities/assigned-hse-routine.entity';
import { HseHandbook } from './entities/hse-handbook.entity';
import { HseHandbookAssignedRisk } from './entities/hse-handbook-assigned-risk.entity';
import { HseHandbookAssignedRoutine } from './entities/hse-handbook-assigned-routine.entity';
import { HseHandbookSignaturesService } from '../hse-handbook-signatures/hse-handbook-signatures.service';
import { HseHandbookOrgStructure } from './entities/hse-handbook-org-structure.entity';
import { OrgStructuresService } from '../org-structures/org-structures.service';
import { S3Service } from '../s3/s3.service';
import { HseHandbookSignature } from '../hse-handbook-signatures/entities/hse-handbook-signature.entity';

describe('HseHandbookController', () => {
  let controller: HseHandbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseHandbookController],
      providers: [
        HseHandbookService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }, {
          provide: getRepositoryToken(User),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(Company),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(AssignedHseRisk),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(AssignedHseRoutine),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(HseHandbook),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(HseHandbookAssignedRisk),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(HseHandbookAssignedRoutine),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(HseHandbookOrgStructure),
          useValue: jest.fn()
        }, {
          provide: getRepositoryToken(HseHandbookSignature),
          useValue: jest.fn()
        }, {
          provide: HseHandbookSignaturesService,
          useFactory: () => ({ send: jest.fn() })
        }, {
          provide: OrgStructuresService,
          useFactory: () => ({ findOne: jest.fn() })
        },
        {
          provide: S3Service,
          useFactory: () => ({ uploadFile: jest.fn() })
        }
      ],
    }).compile();

    controller = module.get<HseHandbookController>(HseHandbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
