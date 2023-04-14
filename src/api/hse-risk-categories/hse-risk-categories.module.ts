import { Module } from '@nestjs/common';
import { HseRiskCategoriesService } from './hse-risk-categories.service';
import { HseRiskCategoriesController } from './hse-risk-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HseRiskCategory } from './entities/hse-risk-category.entity';
import { HseRiskCategoryTranslation } from './entities/hse-risk-categories-translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HseRiskCategory, HseRiskCategoryTranslation])],
  controllers: [HseRiskCategoriesController],
  providers: [HseRiskCategoriesService]
})
export class HseRiskCategoriesModule {}
