import { Controller, Get, Post, Body, UseGuards, Res } from '@nestjs/common';
import { OrgStructuresService } from './org-structures.service';
import { CreateOrgStructureDto } from './dto/create-org-structure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guards';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { Response } from 'express';


@ApiTags('Org Structure')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('org-structures')
export class OrgStructuresController {
  constructor(private readonly orgStructuresService: OrgStructuresService) {}

  @Post()
  create(
    @UserAndLang() { user },
    @Body() createOrgStructureDto: CreateOrgStructureDto
  ) {
    return this.orgStructuresService.save(createOrgStructureDto, user);
  }

  @Get()
  findOne(
    @UserAndLang() { user },
  ) {
    return this.orgStructuresService.findOne(user.companyUuid);
  }

  @Get('pdf')
  getPdf(
    @UserAndLang() { user, lang },
    @Res() res: Response,
  ) {
    return this.orgStructuresService.getPdf(res, user.companyUuid, lang);
  }
}
