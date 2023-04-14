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
import { AssignedHseRisksService } from './assigned-hse-risks.service';
import { CreateAssignedHseRiskDto } from './dto/create-assigned-hse-risk.dto';
import { UpdateAssignedHseRiskDto } from './dto/update-assigned-hse-risk.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, JwtManagerAuthGuard } from '../auth/auth.guards';
import { AssignedHseRisk } from './entities/assigned-hse-risk.entity';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import { FilterParams, ParseFilterPipe } from '../../helpers/filter.pipe';
import { UpdateMultipleAssignedHseRiskDto } from './dto/update-multiple-assigned-hse-risk.dto';


@ApiTags('Assigned HSE Risks')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assigned-hse-risks')
export class AssignedHseRisksController {
  constructor(private readonly assignedHseRisksService: AssignedHseRisksService) {}

  @Post()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: AssignedHseRisk })
  @ApiBody({ type: [CreateAssignedHseRiskDto] })
  create(
    @UserAndLang() { lang, user },
    @Body() createAssignedHseRiskDtos: CreateAssignedHseRiskDto[]
  ) {
    return this.assignedHseRisksService.create(createAssignedHseRiskDtos, { lang, user });
  }

  @Get()
  @ApiPaginatedResponse(AssignedHseRisk)
  @ApiQuery({ name: 'q', required: false })
  findAll(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query(new ParseFilterPipe()) filters: FilterParams,
    @Query('q') search?: string,
  ) {
    return this.assignedHseRisksService.findAll({ pagination, lang, search, user, filters });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean'})
  @ApiOkResponse({ type: AssignedHseRisk })
  async findOne(
    @UserAndLang() { lang, user },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    const target = await this.assignedHseRisksService.findOne(id, { lang, user, hasTranslations });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: AssignedHseRisk })
  async updateMultiple(
    @UserAndLang() { lang, user },
    @Body() updateMultipleAssignedHseRiskDto: UpdateMultipleAssignedHseRiskDto
  ) {
    const result = await this.assignedHseRisksService.updateMultiple(updateMultipleAssignedHseRiskDto, { lang, user });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Patch(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: AssignedHseRisk })
  async update(
    @UserAndLang() { lang, user },
    @Param('id') id: string,
    @Body() updateAssignedHseRiskDto: UpdateAssignedHseRiskDto
  ) {
    const result = await this.assignedHseRisksService.update(id, updateAssignedHseRiskDto, { lang, user });
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiQuery({ name: 'ids', type: [String] })
  async removeMultiple(@Query('ids', new ValidationPipe({ transform: true })) ids: string[]) {
    const result = await this.assignedHseRisksService.removeMultiple(Array.isArray(ids) ? ids : [ids]);
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  async remove(@Param('id') id: string) {
    const result = await this.assignedHseRisksService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }
}
