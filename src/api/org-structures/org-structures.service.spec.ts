import { Test, TestingModule } from '@nestjs/testing';
import { OrgStructuresService } from './org-structures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrgStructure } from './entities/org-structure.entity';

describe('OrgStructuresService', () => {
  let service: OrgStructuresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrgStructuresService,
        {
          provide: getRepositoryToken(OrgStructure),
          useValue: jest.fn()
        }
      ],
    }).compile();

    service = module.get<OrgStructuresService>(OrgStructuresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
