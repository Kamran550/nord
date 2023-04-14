import { Module } from '@nestjs/common';
import { HseRoutineCategoriesService } from './hse-routine-categories.service';
import { HseRoutineCategoriesController } from './hse-routine-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HseRoutineCategory } from './entities/hse-routine-category.entity';
import { HseRoutineCategoryTranslation } from './entities/hse-routine-categories-translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HseRoutineCategory, HseRoutineCategoryTranslation])],
  controllers: [HseRoutineCategoriesController],
  providers: [HseRoutineCategoriesService]
})
export class HseRoutineCategoriesModule {}
