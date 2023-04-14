import { Test, TestingModule } from '@nestjs/testing';
import { HseRoutineCategoriesController } from './hse-routine-categories.controller';
import { HseRoutineCategoriesService } from './hse-routine-categories.service';
import { DataSource } from 'typeorm';

describe('HseRoutineCategoriesController', () => {
  let controller: HseRoutineCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseRoutineCategoriesController],
      providers: [
        HseRoutineCategoriesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ]
    }).compile();

    controller = module.get<HseRoutineCategoriesController>(HseRoutineCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
