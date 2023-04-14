import { Test, TestingModule } from '@nestjs/testing';
import { HseRiskTemplatesController } from './hse-risk-templates.controller';
import { HseRiskTemplatesService } from './hse-risk-templates.service';
import { DataSource } from 'typeorm';

describe('HseRiskTemplatesController', () => {
  let controller: HseRiskTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseRiskTemplatesController],
      providers: [
        HseRiskTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<HseRiskTemplatesController>(HseRiskTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
