import { Test, TestingModule } from '@nestjs/testing';
import { HseRisksController } from './hse-risks.controller';
import { HseRisksService } from './hse-risks.service';
import { DataSource } from 'typeorm';

describe('HseRisksController', () => {
  let controller: HseRisksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseRisksController],
      providers: [
        HseRisksService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<HseRisksController>(HseRisksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
