import { PartialType } from '@nestjs/swagger';
import { CreateHseHandbookDto } from './create-hse-handbook.dto';

export class UpdateHseHandbookDto extends PartialType(CreateHseHandbookDto) {}
