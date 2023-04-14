import { Module } from '@nestjs/common';
import { HseRoutineTemplatesService } from './hse-routine-templates.service';
import { HseRoutineTemplatesController } from './hse-routine-templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HseRoutineTemplate } from './entities/hse-routine-template.entity';
import { HseRoutineTemplateTranslation } from './entities/hse-routine-templates-translations.entity';


@Module({
  imports: [TypeOrmModule.forFeature([HseRoutineTemplate, HseRoutineTemplateTranslation])],
  controllers: [HseRoutineTemplatesController],
  providers: [HseRoutineTemplatesService]
})
export class HseRoutineTemplatesModule {
}
