import { Test, TestingModule } from '@nestjs/testing';
import { AssignedHseRisksService } from './assigned-hse-risks.service';
import { DataSource } from 'typeorm';

describe('AssignedHseRisksService', () => {
  let service: AssignedHseRisksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssignedHseRisksService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ],
    }).compile();

    service = module.get<AssignedHseRisksService>(AssignedHseRisksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
