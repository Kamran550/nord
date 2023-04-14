import { Test, TestingModule } from '@nestjs/testing';
import { HseRiskCategoriesController } from './hse-risk-categories.controller';
import { HseRiskCategoriesService } from './hse-risk-categories.service';
import { DataSource } from 'typeorm';

describe('HseRiskCategoriesController', () => {
  let controller: HseRiskCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseRiskCategoriesController],
      providers: [
        HseRiskCategoriesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<HseRiskCategoriesController>(HseRiskCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
