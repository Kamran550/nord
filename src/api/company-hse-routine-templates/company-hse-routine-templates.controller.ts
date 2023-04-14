import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { CompanyHseRoutineTemplatesService } from './company-hse-routine-templates.service';
import { CreateCompanyHseRoutineTemplateDto } from './dto/create-company-hse-routine-template.dto';
import { UpdateCompanyHseRoutineTemplateDto } from './dto/update-company-hse-routine-template.dto';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyHseRoutineTemplate } from './entities/company-hse-routine-template.entity';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import { JwtAuthGuard, JwtManagerAuthGuard } from '../auth/auth.guards';


@ApiTags('Company HSE Routine Templates')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-hse-routine-templates')
export class CompanyHseRoutineTemplatesController {
  constructor(private readonly companyHseRoutineTemplatesService: CompanyHseRoutineTemplatesService) {}

  @Post()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: CompanyHseRoutineTemplate })
  create(
    @UserAndLang() { lang },
    @Body() createCompanyHseRoutineTemplateDto: CreateCompanyHseRoutineTemplateDto
  ) {
    return this.companyHseRoutineTemplatesService.create(createCompanyHseRoutineTemplateDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(CompanyHseRoutineTemplate)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.companyHseRoutineTemplatesService.findAll({ pagination, lang, search, user });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: CompanyHseRoutineTemplate })
  async findOne(
    @UserAndLang() { lang, user },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.companyHseRoutineTemplatesService.findOne(id, { lang, user, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: CompanyHseRoutineTemplate })
  async update(
    @UserAndLang() { lang, user  },
    @Param('id') id: string,
    @Body() updateCompanyHseRoutineTemplateDto: UpdateCompanyHseRoutineTemplateDto
  ) {
    const result = await this.companyHseRoutineTemplatesService.update(id, updateCompanyHseRoutineTemplateDto, { lang, user });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  async remove(
    @UserAndLang() { lang, user },
    @Param('id') id: string
  ) {
    const result = await this.companyHseRoutineTemplatesService.remove(id, { lang, user });
    if (!result) throw new NotFoundException();

    return result;
  }
}
