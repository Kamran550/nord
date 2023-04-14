import { Controller, Get, Post, Body, Param, Res, UseGuards, Query } from '@nestjs/common';
import type { Response } from 'express';
import { HseHandbookService } from './hse-handbook.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guards';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';


@ApiTags('HSE Handbook')
@Controller('hse-handbook')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class HseHandbookController {
  constructor(private readonly hseHandbookService: HseHandbookService) {}

  @Post('print-new-version')
  printNewPdf(
    @UserAndLang() { user, lang },
    @Res() res: Response,
    @Body() data: any
  ) {
    return this.hseHandbookService.getPdfForNewVersion(res, { user, params: data, lang });
  }

  @Post('print')
  printPdf(
    @UserAndLang() { user, lang },
    @Res() res: Response,
    @Body() data: any
  ) {
    return this.hseHandbookService.getPdfForExistingVersion(res, { user, params: data, lang });
  }

  @Get('has-new-version')
  isNewVersionAvailable(
    @UserAndLang() { user },
  ) {
    return this.hseHandbookService.isNewVersionAvailable(user);
  }

  @Post('approve')
  async approve(
    @UserAndLang() { user },
    @Body() data: any
  ) {
    return this.hseHandbookService.approve({ user, params: data });
  }

  @Get()
  findAll(
    @UserAndLang() { user, lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
  ) {
    return this.hseHandbookService.findAll({ pagination, user, lang });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hseHandbookService.findOne(id);
  }
}
