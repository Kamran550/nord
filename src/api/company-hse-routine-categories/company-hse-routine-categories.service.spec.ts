import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHseRoutineCategoriesService } from './company-hse-routine-categories.service';
import { DataSource } from 'typeorm';

describe('CompanyHseRoutineCategoriesService', () => {
  let service: CompanyHseRoutineCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyHseRoutineCategoriesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<CompanyHseRoutineCategoriesService>(CompanyHseRoutineCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
