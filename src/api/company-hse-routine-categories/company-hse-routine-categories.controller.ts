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
  UseGuards, ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyHseRoutineCategoriesService } from './company-hse-routine-categories.service';
import { CreateCompanyHseRoutineCategoryDto } from './dto/create-company-hse-routine-category.dto';
import { UpdateCompanyHseRoutineCategoryDto } from './dto/update-company-hse-routine-category.dto';
import { CompanyHseRoutineCategory } from './entities/company-hse-routine-category.entity';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import { JwtAuthGuard, JwtManagerAuthGuard } from '../auth/auth.guards';


@ApiTags('Company HSE Routine Categories')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('company-hse-routine-categories')
export class CompanyHseRoutineCategoriesController {
  constructor(private readonly companyHseRoutineCategoriesService: CompanyHseRoutineCategoriesService) {}

  @Post()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: CompanyHseRoutineCategory })
  create(
    @UserAndLang() { lang },
    @Body() createCompanyHseRoutineCategoryDto: CreateCompanyHseRoutineCategoryDto
  ) {
    return this.companyHseRoutineCategoriesService.create(createCompanyHseRoutineCategoryDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(CompanyHseRoutineCategory)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { user, lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.companyHseRoutineCategoriesService.findAll({ pagination, lang, search, user });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: CompanyHseRoutineCategory })
  async findOne(
    @UserAndLang() { user, lang },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.companyHseRoutineCategoriesService.findOne(id, { lang, user, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: CompanyHseRoutineCategory })
  async update(
    @UserAndLang() { user, lang },
    @Param('id') id: string,
    @Body() updateCompanyHseRoutineCategoryDto: UpdateCompanyHseRoutineCategoryDto
  ) {
    const result = await this.companyHseRoutineCategoriesService.update(id, updateCompanyHseRoutineCategoryDto, { lang, user });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiResponse({ status: 409, description: 'Category used by template' })
  async remove(
    @UserAndLang() { user, lang },
    @Param('id') id: string
  ) {
    const result = await this.companyHseRoutineCategoriesService.remove(id, { lang, user });
    if (!result) throw new NotFoundException();

    return result;
  }
}
