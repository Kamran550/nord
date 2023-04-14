import { Controller, Get, Param, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { ApiBearerAuth, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { JwtAuthGuard } from '../auth/auth.guards';

@ApiTags('Positions')
@ApiBearerAuth()
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@UseGuards(JwtAuthGuard)
@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  findAll(
    @UserAndLang() { lang },
  ) {
    return this.positionsService.findAll({ lang });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean' })
  findOne(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true})) hasTranslations: boolean
  ) {
    return this.positionsService.findOne(id, { lang, hasTranslations });
  }
}
