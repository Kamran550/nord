import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException, UseGuards, ValidationPipe
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HseRoutineTemplatesService } from './hse-routine-templates.service';
import { CreateHseRoutineTemplateDto } from './dto/create-hse-routine-template.dto';
import { UpdateHseRoutineTemplateDto } from './dto/update-hse-routine-template.dto';
import { HseRoutineTemplate } from './entities/hse-routine-template.entity';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import { JwtAuthGuard, JwtSuperAdminAuthGuard } from '../auth/auth.guards';


@ApiTags('HSE Routine Templates')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hse-routine-templates')
export class HseRoutineTemplatesController {
  constructor(private readonly hseRoutineTemplatesService: HseRoutineTemplatesService) {}

  @Post()
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRoutineTemplate })
  async create(
    @UserAndLang() { lang },
    @Body() createHseRoutineTemplateDto: CreateHseRoutineTemplateDto
  ) {
    return await this.hseRoutineTemplatesService.create(createHseRoutineTemplateDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(HseRoutineTemplate)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.hseRoutineTemplatesService.findAll({ pagination, lang, search });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: HseRoutineTemplate })
  async findOne(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.hseRoutineTemplatesService.findOne(id, { lang, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRoutineTemplate })
  async update(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Body() updateHseRoutineTemplateDto: UpdateHseRoutineTemplateDto
  ) {
    const result = await this.hseRoutineTemplatesService.update(id, updateHseRoutineTemplateDto, { lang });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  async remove(@Param('id') id: string) {
    const result = await this.hseRoutineTemplatesService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }
}
