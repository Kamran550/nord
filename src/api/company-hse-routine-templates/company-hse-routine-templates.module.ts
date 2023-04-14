import { Module } from '@nestjs/common';
import { CompanyHseRoutineTemplatesService } from './company-hse-routine-templates.service';
import { CompanyHseRoutineTemplatesController } from './company-hse-routine-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyHseRoutineTemplate } from './entities/company-hse-routine-template.entity';
import { CompanyHseRoutineTemplateTranslation } from './entities/company-hse-routine-templates-translations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyHseRoutineTemplate, CompanyHseRoutineTemplateTranslation])],
  controllers: [CompanyHseRoutineTemplatesController],
  providers: [CompanyHseRoutineTemplatesService]
})
export class CompanyHseRoutineTemplatesModule {}
