import { Test, TestingModule } from '@nestjs/testing';
import { OrgStructuresController } from './org-structures.controller';
import { OrgStructuresService } from './org-structures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrgStructure } from './entities/org-structure.entity';

describe('OrgStructuresController', () => {
  let controller: OrgStructuresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgStructuresController],
      providers: [
        OrgStructuresService,
        {
          provide: getRepositoryToken(OrgStructure),
          useValue: jest.fn()
        }
      ],
    }).compile();

    controller = module.get<OrgStructuresController>(OrgStructuresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
