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
import { HseRiskCategoriesService } from './hse-risk-categories.service';
import { CreateHseRiskCategoryDto } from './dto/create-hse-risk-category.dto';
import { UpdateHseRiskCategoryDto } from './dto/update-hse-risk-category.dto';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, JwtSuperAdminAuthGuard } from '../auth/auth.guards';
import { HseRiskCategory } from './entities/hse-risk-category.entity';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';

@ApiTags('HSE Risk Categories')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hse-risk-categories')
export class HseRiskCategoriesController {
  constructor(private readonly hseRiskCategoriesService: HseRiskCategoriesService) {}

  @Post()
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRiskCategory })
  create(
    @UserAndLang() { lang },
    @Body() createHseRiskCategoryDto: CreateHseRiskCategoryDto
  ) {
    console.log('CONT LANG:',lang);
    
    return this.hseRiskCategoriesService.create(createHseRiskCategoryDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(HseRiskCategory)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.hseRiskCategoriesService.findAll({ pagination, lang, search });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: HseRiskCategory })
  async findOne(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.hseRiskCategoriesService.findOne(id, { lang, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRiskCategory })
  async update(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Body() updateHseRiskCategoryDto: UpdateHseRiskCategoryDto
  ) {
    const result = await this.hseRiskCategoriesService.update(id, updateHseRiskCategoryDto, { lang });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiResponse({ status: 409, description: 'Category used by template' })
  async remove(@Param('id') id: string) {
    const result = await this.hseRiskCategoriesService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }
}
