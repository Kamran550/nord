import { Test, TestingModule } from '@nestjs/testing';
import { AssignedHseRoutinesController } from './assigned-hse-routines.controller';
import { AssignedHseRoutinesService } from './assigned-hse-routines.service';
import { DataSource } from 'typeorm';

describe('AssignedHseRoutinesController', () => {
  let controller: AssignedHseRoutinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedHseRoutinesController],
      providers: [
        AssignedHseRoutinesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    controller = module.get<AssignedHseRoutinesController>(AssignedHseRoutinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
