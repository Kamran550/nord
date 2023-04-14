import { Test, TestingModule } from '@nestjs/testing';
import { HseRoutineTemplatesController } from './hse-routine-templates.controller';
import { HseRoutineTemplatesService } from './hse-routine-templates.service';
import { DataSource } from 'typeorm';

describe('HseRoutineTemplatesController', () => {
  let controller: HseRoutineTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseRoutineTemplatesController],
      providers: [
        HseRoutineTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ]
    }).compile();

    controller = module.get<HseRoutineTemplatesController>(HseRoutineTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
