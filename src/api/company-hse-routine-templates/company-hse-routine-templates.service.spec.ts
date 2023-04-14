import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHseRoutineTemplatesService } from './company-hse-routine-templates.service';
import { DataSource } from 'typeorm';

describe('CompanyHseRoutineTemplatesService', () => {
  let service: CompanyHseRoutineTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyHseRoutineTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<CompanyHseRoutineTemplatesService>(CompanyHseRoutineTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
