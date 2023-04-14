import { Test, TestingModule } from '@nestjs/testing';
import { AssignedHseRisksController } from './assigned-hse-risks.controller';
import { AssignedHseRisksService } from './assigned-hse-risks.service';
import { DataSource } from 'typeorm';

describe('AssignedHseRisksController', () => {
  let controller: AssignedHseRisksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedHseRisksController],
      providers: [
        AssignedHseRisksService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<AssignedHseRisksController>(AssignedHseRisksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
