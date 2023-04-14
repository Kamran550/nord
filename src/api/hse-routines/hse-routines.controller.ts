import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { HseRoutinesService } from './hse-routines.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guards';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';


@ApiTags('HSE Routines')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hse-routines')
export class HseRoutinesController {
  constructor(private readonly hseRoutinesService: HseRoutinesService) {}

  @Get('categories')
  @ApiQuery({ name: 'q', required: false })
  findAllCategories(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.hseRoutinesService.findAllCategories({ pagination, lang, search, user });
  }

  @Get('templates')
  @ApiQuery({ name: 'q', required: false })
  findAllTemplates(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.hseRoutinesService.findAllTemplates({ pagination, lang, search, user });
  }
}
