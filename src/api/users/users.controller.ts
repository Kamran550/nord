import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtLeaderAuthGuard } from '../auth/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtLeaderAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
