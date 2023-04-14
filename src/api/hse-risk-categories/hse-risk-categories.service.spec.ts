import { Test, TestingModule } from '@nestjs/testing';
import { HseRiskCategoriesService } from './hse-risk-categories.service';
import { DataSource } from 'typeorm';

describe('HseRiskCategoriesService', () => {
  let service: HseRiskCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HseRiskCategoriesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<HseRiskCategoriesService>(HseRiskCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
