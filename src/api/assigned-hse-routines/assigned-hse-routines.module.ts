import { Module } from '@nestjs/common';
import { AssignedHseRoutinesService } from './assigned-hse-routines.service';
import { AssignedHseRoutinesController } from './assigned-hse-routines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedHseRoutine } from './entities/assigned-hse-routine.entity';
import { AssignedHseRoutineTranslation } from './entities/assigned-hse-routines-translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignedHseRoutine, AssignedHseRoutineTranslation])],
  controllers: [AssignedHseRoutinesController],
  providers: [AssignedHseRoutinesService]
})
export class AssignedHseRoutinesModule {}
