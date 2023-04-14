import { Test, TestingModule } from '@nestjs/testing';
import { HseRisksService } from './hse-risks.service';
import { DataSource } from 'typeorm';

describe('HseRisksService', () => {
  let service: HseRisksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HseRisksService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<HseRisksService>(HseRisksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
