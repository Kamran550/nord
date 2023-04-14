import { Test, TestingModule } from '@nestjs/testing';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';

describe('StatusesController', () => {
  let controller: StatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusesController],
      providers: [
        StatusesService,
        {
          provide: getRepositoryToken(Status),
          useValue: jest.fn()
        }
      ],
    }).compile();

    controller = module.get<StatusesController>(StatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
