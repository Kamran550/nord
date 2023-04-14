import { Test, TestingModule } from '@nestjs/testing';
import { StatusesService } from './statuses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';

describe('StatusesService', () => {
  let service: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusesService,
        {
          provide: getRepositoryToken(Status),
          useValue: jest.fn()
        }
      ],
    }).compile();

    service = module.get<StatusesService>(StatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
