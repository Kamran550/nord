import { Module } from '@nestjs/common';
import { HseRiskTemplatesService } from './hse-risk-templates.service';
import { HseRiskTemplatesController } from './hse-risk-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HseRiskTemplate } from './entities/hse-risk-template.entity';
import { HseRiskTemplateTranslation } from './entities/hse-risk-templates-translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HseRiskTemplate, HseRiskTemplateTranslation])],
  controllers: [HseRiskTemplatesController],
  providers: [HseRiskTemplatesService]
})
export class HseRiskTemplatesModule {}
