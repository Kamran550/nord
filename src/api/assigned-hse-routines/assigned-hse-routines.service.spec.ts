import { Test, TestingModule } from '@nestjs/testing';
import { AssignedHseRoutinesService } from './assigned-hse-routines.service';
import { DataSource } from 'typeorm';

describe('AssignedHseRoutinesService', () => {
  let service: AssignedHseRoutinesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignedHseRoutinesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<AssignedHseRoutinesService>(AssignedHseRoutinesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
