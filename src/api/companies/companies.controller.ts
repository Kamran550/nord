import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { ApiPaginatedResponse } from '../../types';
import { JwtAuthGuard } from '../auth/auth.guards';


@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiPaginatedResponse(Company)
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('/slug/:slug')
  @ApiOkResponse({ type: Company })
  findOneBySlug(@Param('slug') slug: string) {
    return this.companiesService.findOneBySlug(slug);
  }

  @Get(':id')
  @ApiOkResponse({ type: Company })
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }
}
