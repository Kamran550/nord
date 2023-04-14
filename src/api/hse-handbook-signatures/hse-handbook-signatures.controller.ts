import { Controller, Get, Post, Body, Param, UseGuards, Query, UseInterceptors, UploadedFile, Patch } from '@nestjs/common';
import { HseHandbookSignaturesService } from './hse-handbook-signatures.service';
import { SendForSigningDto } from './dto/send-for-signing.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guards';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { PaginationParams, ParsePaginationPipe } from '../../helpers/pagination.pipe';
import { FilterParams, ParseFilterPipe } from '../../helpers/filter.pipe';
import { RemindForSigningDto } from './dto/remind-for-signing.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('HSE Handbook Signatures')
@Controller('hse-handbook-signatures')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class HseHandbookSignaturesController {
  constructor(private readonly hseHandbookSignaturesService: HseHandbookSignaturesService) { }

  @Post('send')
  send(
    @UserAndLang() { user },
    @Body() data: SendForSigningDto
  ) {
    return this.hseHandbookSignaturesService.send({ user, data });
  }

  @Post('remind')
  remind(
    @UserAndLang() { user },
    @Body() data: RemindForSigningDto
  ) {
    return this.hseHandbookSignaturesService.remind({ user, data });
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch('sign/:id')
  sign(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string
  ) {
    return this.hseHandbookSignaturesService.sign(id, file);
  }

  @Get()
  findAll(
    @UserAndLang() { user, lang },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
  ) {
    return this.hseHandbookSignaturesService.findAll({ user, pagination, lang });
  }

  @Get('by-user')
  findAllByUser(
    @UserAndLang() { user, lang },
    @Query(new ParseFilterPipe()) filters: FilterParams,
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
  ) {
    return this.hseHandbookSignaturesService.findAllByUser({ user, pagination, filters, lang });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hseHandbookSignaturesService.findOne(id);
  }
}
