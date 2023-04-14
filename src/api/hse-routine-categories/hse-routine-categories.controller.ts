import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query, UseGuards, ValidationPipe
} from '@nestjs/common';
import { HseRoutineCategoriesService } from './hse-routine-categories.service';
import { CreateHseRoutineCategoryDto } from './dto/create-hse-routine-category.dto';
import { UpdateHseRoutineCategoryDto } from './dto/update-hse-routine-category.dto';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HseRoutineCategory } from './entities/hse-routine-category.entity';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import { JwtAuthGuard, JwtSuperAdminAuthGuard } from '../auth/auth.guards';


@ApiTags('HSE Routine Categories')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hse-routine-categories')
export class HseRoutineCategoriesController {
  constructor(private readonly hseRoutineCategoriesService: HseRoutineCategoriesService) {}

  @Post()
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRoutineCategory })
  create(
    @UserAndLang() { lang },
    @Body() createHseRoutineCategoryDto: CreateHseRoutineCategoryDto
  ) {
    return this.hseRoutineCategoriesService.create(createHseRoutineCategoryDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(HseRoutineCategory)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.hseRoutineCategoriesService.findAll({ pagination, lang, search });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: HseRoutineCategory })
  async findOne(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.hseRoutineCategoriesService.findOne(id, { lang, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRoutineCategory })
  async update(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Body() updateHseRoutineCategoryDto: UpdateHseRoutineCategoryDto
  ) {
    const result = await this.hseRoutineCategoriesService.update(id, updateHseRoutineCategoryDto, { lang });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiResponse({ status: 409, description: 'Category used by template' })
  async remove(@Param('id') id: string) {
    const result = await this.hseRoutineCategoriesService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }
}
