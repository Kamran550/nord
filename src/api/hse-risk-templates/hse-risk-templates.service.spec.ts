import { Test, TestingModule } from '@nestjs/testing';
import { HseRiskTemplatesService } from './hse-risk-templates.service';
import { DataSource } from 'typeorm';

describe('HseRiskTemplatesService', () => {
  let service: HseRiskTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HseRiskTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<HseRiskTemplatesService>(HseRiskTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
