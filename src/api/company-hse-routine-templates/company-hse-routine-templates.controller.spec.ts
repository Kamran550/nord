import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHseRoutineTemplatesController } from './company-hse-routine-templates.controller';
import { CompanyHseRoutineTemplatesService } from './company-hse-routine-templates.service';
import { DataSource } from 'typeorm';

describe('CompanyHseRoutineTemplatesController', () => {
  let controller: CompanyHseRoutineTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyHseRoutineTemplatesController],
      providers: [
        CompanyHseRoutineTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<CompanyHseRoutineTemplatesController>(CompanyHseRoutineTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
