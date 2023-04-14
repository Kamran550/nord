import { Test, TestingModule } from '@nestjs/testing';
import { CompanyHseRiskTemplatesController } from './company-hse-risk-templates.controller';
import { CompanyHseRiskTemplatesService } from './company-hse-risk-templates.service';
import { DataSource } from 'typeorm';

describe('CompanyHseRiskTemplatesController', () => {
  let controller: CompanyHseRiskTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyHseRiskTemplatesController],
      providers: [
        CompanyHseRiskTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<CompanyHseRiskTemplatesController>(CompanyHseRiskTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
