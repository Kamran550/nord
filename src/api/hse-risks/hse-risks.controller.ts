import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { HseRisksService } from './hse-risks.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guards';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import { FilterParams, ParseFilterPipe } from '../../helpers/filter.pipe';


@ApiTags('HSE Risks')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hse-risks')
export class HseRisksController {
  constructor(private readonly hseRisksService: HseRisksService) {}

  @Get('templates')
  @ApiQuery({ name: 'q', required: false })
  findAllTemplates(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query(new ParseFilterPipe()) filters: FilterParams,
    @Query('q') search?: string
  ) {
    return this.hseRisksService.findAllTemplates({ pagination, lang, search, user, filters });
  }
}
