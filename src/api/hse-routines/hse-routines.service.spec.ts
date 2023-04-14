import { Test, TestingModule } from '@nestjs/testing';
import { HseRoutinesService } from './hse-routines.service';
import { DataSource } from 'typeorm';

describe('HseRoutinesService', () => {
  let service: HseRoutinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HseRoutinesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<HseRoutinesService>(HseRoutinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
