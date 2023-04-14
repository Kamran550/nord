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
import { HseRiskTemplatesService } from './hse-risk-templates.service';
import { CreateHseRiskTemplateDto } from './dto/create-hse-risk-template.dto';
import { UpdateHseRiskTemplateDto } from './dto/update-hse-risk-template.dto';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, JwtSuperAdminAuthGuard } from '../auth/auth.guards';
import { HseRiskTemplate } from './entities/hse-risk-template.entity';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';


@ApiTags('HSE Risk Templates')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hse-risk-templates')
export class HseRiskTemplatesController {
  constructor(private readonly hseRiskTemplatesService: HseRiskTemplatesService) {}

  @Post()
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRiskTemplate })
  async create(
    @UserAndLang() { lang },
    @Body() createHseRiskTemplateDto: CreateHseRiskTemplateDto
  ) {
    return await this.hseRiskTemplatesService.create(createHseRiskTemplateDto, { lang });
  }

  @Get()
  @ApiPaginatedResponse(HseRiskTemplate)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.hseRiskTemplatesService.findAll({ pagination, lang, search });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: HseRiskTemplate })
  async findOne(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.hseRiskTemplatesService.findOne(id, { lang, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: HseRiskTemplate })
  async update(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Body() updateHseRiskTemplateDto: UpdateHseRiskTemplateDto
  ) {
    const result = await this.hseRiskTemplatesService.update(id, updateHseRiskTemplateDto, { lang });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtSuperAdminAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  async remove(@Param('id') id: string) {
    const result = await this.hseRiskTemplatesService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }
}
