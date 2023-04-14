import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AssignedHseRoutinesService } from './assigned-hse-routines.service';
import { CreateAssignedHseRoutineDto } from './dto/create-assigned-hse-routine.dto';
import { UpdateAssignedHseRoutineDto } from './dto/update-assigned-hse-routine.dto';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AssignedHseRoutine } from './entities/assigned-hse-routine.entity';
import UserAndLang from '../../helpers/user-and-lang.decorator';
import { ApiPaginatedResponse, DeleteResponseDto } from '../../types';
import {
  PaginationParams,
  ParsePaginationPipe,
} from '../../helpers/pagination.pipe';
import { AssignHseRoutineDto } from './dto/assign-hse-routine.dto';
import { JwtAuthGuard, JwtManagerAuthGuard } from '../auth/auth.guards';
import { UpdateMultipleAssignedHseRoutineDto } from './dto/update-multiple-assigned-hse-routine.dto';

@ApiTags('Assigned HSE Routines')
@ApiHeader({ name: 'Accept-Language', schema: { default: 'lt' } })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('assigned-hse-routines')
export class AssignedHseRoutinesController {
  constructor(
    private readonly assignedHseRoutinesService: AssignedHseRoutinesService
  ) {}

  @Post()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: AssignedHseRoutine })
  create(
    @UserAndLang() { lang },
    @Body() createAssignedHseRoutineDto: CreateAssignedHseRoutineDto[]
  ) {
    return this.assignedHseRoutinesService.create(createAssignedHseRoutineDto, {
      lang,
    });
  }

  @Get()
  @ApiPaginatedResponse(AssignedHseRoutine)
  @ApiQuery({ name: 'q', required: false })
  async findAll(
    @UserAndLang() { lang, user },
    @Query(new ParsePaginationPipe()) pagination: PaginationParams,
    @Query('q') search?: string
  ) {
    return this.assignedHseRoutinesService.findAll({
      pagination,
      lang,
      search,
      user,
    });
  }

  @Get(':id')
  @ApiQuery({ name: 'hasTranslations', required: false, type: 'boolean' })
  @ApiOkResponse({ type: AssignedHseRoutine })
  async findOne(
    @UserAndLang() { lang, user },
    @Param('id') id: string,
    @Query('hasTranslations', new ValidationPipe({ transform: true }))
    hasTranslations: boolean
  ) {
    const target = await this.assignedHseRoutinesService.findOne(id, {
      lang,
      user,
      hasTranslations,
    });
    if (!target) throw new NotFoundException();

    return target;
  }

  @Patch(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: AssignedHseRoutine })
  async update(
    @UserAndLang() { lang },
    @Param('id') id: string,
    @Body() updateAssignedHseRoutineDto: UpdateAssignedHseRoutineDto
  ) {
    const result = await this.assignedHseRoutinesService.update(
      id,
      updateAssignedHseRoutineDto,
      { lang }
    );
    if (!result) throw new NotFoundException();

    return result;
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: AssignedHseRoutine })
  async updateMultiple(
    @UserAndLang() {lang},
    @Body() updateMultipleAssignedHseRoutineDto: UpdateMultipleAssignedHseRoutineDto
    )
  {
    const result = await this.assignedHseRoutinesService.updateMultiple(updateMultipleAssignedHseRoutineDto,{lang});
    if(!result) throw new NotFoundException();

    return result;

  }

  @Delete()
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiQuery({ name: 'ids', type: [String] })
  async removeMultiple(
    @Query('ids', new ValidationPipe({ transform: true })) ids: string[]
  ) {
    const result = await this.assignedHseRoutinesService.removeMultiple(
      Array.isArray(ids) ? ids : [ids]
    );
    if (!result) throw new NotFoundException();

    return result;
  }

  @Delete(':id')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: DeleteResponseDto })
  async remove(@Param('id') id: string) {
    const result = await this.assignedHseRoutinesService.remove(id);
    if (!result) throw new NotFoundException();

    return result;
  }

  @Post('assign')
  @UseGuards(JwtManagerAuthGuard)
  @ApiOkResponse({ type: [AssignedHseRoutine] })
  assign(@Body() assignHseRoutineDto: AssignHseRoutineDto) {
    return this.assignedHseRoutinesService.assign(assignHseRoutineDto);
  }
}
