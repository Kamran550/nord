import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

describe('CountriesController', () => {
  let controller: CountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useValue: jest.fn()
        }
      ],
    }).compile();

    controller = module.get<CountriesController>(CountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
