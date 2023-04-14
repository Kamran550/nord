import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHseRoutineCategoriesController } from './company-hse-routine-categories.controller';
import { CompanyHseRoutineCategoriesService } from './company-hse-routine-categories.service';
import { DataSource } from 'typeorm';

describe('CompanyHseRoutineCategoriesController', () => {
  let controller: CompanyHseRoutineCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyHseRoutineCategoriesController],
      providers: [
        CompanyHseRoutineCategoriesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<CompanyHseRoutineCategoriesController>(CompanyHseRoutineCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
