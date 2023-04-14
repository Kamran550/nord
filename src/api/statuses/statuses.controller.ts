import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guards';
import UserAndLang from '../../helpers/user-and-lang.decorator';


@ApiTags('Statuses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get('user')
  user(
    @UserAndLang() { lang },
  ) {
    return this.statusesService.user(lang);
  }
}
