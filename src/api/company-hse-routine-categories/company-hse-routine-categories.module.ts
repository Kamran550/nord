import { Module } from '@nestjs/common';
import { CompanyHseRoutineCategoriesService } from './company-hse-routine-categories.service';
import { CompanyHseRoutineCategoriesController } from './company-hse-routine-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyHseRoutineCategory } from './entities/company-hse-routine-category.entity';
import { CompanyHseRoutineCategoryTranslation } from './entities/company-hse-routine-categories-translations.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CompanyHseRoutineCategory, CompanyHseRoutineCategoryTranslation])],
  controllers: [CompanyHseRoutineCategoriesController],
  providers: [CompanyHseRoutineCategoriesService]
})
export class CompanyHseRoutineCategoriesModule {}
