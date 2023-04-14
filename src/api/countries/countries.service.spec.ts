import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        {
          provide: getRepositoryToken(Country),
          useValue: jest.fn()
        }
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
