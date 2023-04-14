import { Test, TestingModule } from '@nestjs/testing';
import { HseRoutinesController } from './hse-routines.controller';
import { HseRoutinesService } from './hse-routines.service';
import { DataSource } from 'typeorm';

describe('HseRoutinesController', () => {
  let controller: HseRoutinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HseRoutinesController],
      providers: [
        HseRoutinesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<HseRoutinesController>(HseRoutinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
