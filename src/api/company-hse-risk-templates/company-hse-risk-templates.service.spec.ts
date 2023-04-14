import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHseRiskTemplatesService } from './company-hse-risk-templates.service';
import { DataSource } from 'typeorm';

describe('CompanyHseRiskTemplatesService', () => {
  let service: CompanyHseRiskTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyHseRiskTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<CompanyHseRiskTemplatesService>(CompanyHseRiskTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
