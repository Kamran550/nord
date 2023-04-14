import { Test, TestingModule } from '@nestjs/testing';
import { HseRoutineCategoriesService } from './hse-routine-categories.service';
import { DataSource } from 'typeorm';

describe('HseRoutineCategoriesService', () => {
  let service: HseRoutineCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HseRoutineCategoriesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ]
    }).compile();

    service = module.get<HseRoutineCategoriesService>(HseRoutineCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
