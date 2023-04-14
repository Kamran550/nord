import { Module } from '@nestjs/common';
import { HseRoutinesService } from './hse-routines.service';
import { HseRoutinesController } from './hse-routines.controller';

@Module({
  controllers: [HseRoutinesController],
  providers: [HseRoutinesService]
})
export class HseRoutinesModule {}
