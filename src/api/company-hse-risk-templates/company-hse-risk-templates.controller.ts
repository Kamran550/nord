import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
  ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyHseRiskTemplatesService } from './company-hse-risk-templates.service';
import { CreateCompanyHseRiskTemplateDto } from './dto/create-company-hse-risk-template.dto';
import { UpdateCompanyHseRiskTemplateDto } from './dto/update-company-hse-risk-template.dto';
import { JwtAuthGuard, JwtManagerAuthGuard } from '../auth/auth.guards';
import { CompanyHseRiskTemplate } from './entities/company-hse-risk-template.entity';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';


@ApiTags('Company HSE Risk Templates')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-hse-risk-templates')
export class CompanyHseRiskTemplatesController {
  constructor(private readonly companyHseRiskTemplatesService: CompanyHseRiskTemplatesService) {}

  @Post()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: CompanyHseRiskTemplate })
  async create(
    @UserAndLang() { lang },
    @Body() createCompanyHseRiskTemplateDto: CreateCompanyHseRiskTemplateDto
  ) {
    return await this.companyHseRiskTemplatesService.create(createCompanyHseRiskTemplateDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(CompanyHseRiskTemplate)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.companyHseRiskTemplatesService.findAll({ pagination, lang, search, user });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: CompanyHseRiskTemplate })
  async findOne(
    @UserAndLang() { lang, user },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.companyHseRiskTemplatesService.findOne(id, { lang, user, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: CompanyHseRiskTemplate })
  async update(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Body() updateCompanyHseRiskTemplateDto: UpdateCompanyHseRiskTemplateDto
  ) {
    const result = await this.companyHseRiskTemplatesService.update(id, updateCompanyHseRiskTemplateDto, { lang });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  async remove(@Param('id') id: string) {
    const result = await this.companyHseRiskTemplatesService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }
}
