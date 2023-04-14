import { Test, TestingModule } from '@nestjs/testing';
import { HseRoutineTemplatesService } from './hse-routine-templates.service';
import { DataSource } from 'typeorm';

describe('HseRoutineTemplatesService', () => {
  let service: HseRoutineTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HseRoutineTemplatesService,
        {
          provide: DataSource,
          useFactory: () => new DataSource({ type: 'mysql' })
        }
      ]
    }).compile();

    service = module.get<HseRoutineTemplatesService>(HseRoutineTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
