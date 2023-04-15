import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { HseRoutineCategoriesModule } from './api/hse-routine-categories/hse-routine-categories.module';
import { getDataSourceOptions } from './database/typeOrm.config';
import { HseRoutineTemplatesModule } from './api/hse-routine-templates/hse-routine-templates.module';
import { CompanyHseRoutineCategoriesModule } from './api/company-hse-routine-categories/company-hse-routine-categories.module';
import { CompaniesModule } from './api/companies/companies.module';
import { CompanyHseRoutineTemplatesModule } from './api/company-hse-routine-templates/company-hse-routine-templates.module';
import { AssignedHseRoutinesModule } from './api/assigned-hse-routines/assigned-hse-routines.module';
import { ProjectsModule } from './api/projects/projects.module';
import { HseRiskCategoriesModule } from './api/hse-risk-categories/hse-risk-categories.module';
import { HseRiskTemplatesModule } from './api/hse-risk-templates/hse-risk-templates.module';
import { CompanyHseRiskTemplatesModule } from './api/company-hse-risk-templates/company-hse-risk-templates.module';
import { AssignedHseRisksModule } from './api/assigned-hse-risks/assigned-hse-risks.module';
import { HseRoutinesModule } from './api/hse-routines/hse-routines.module';
import { HseRisksModule } from './api/hse-risks/hse-risks.module';
import { AppController } from './app.controller';
import { HseHandbookModule } from './api/hse-handbook/hse-handbook.module';
import { CountriesModule } from './api/countries/countries.module';
import { HseHandbookSignaturesModule } from './api/hse-handbook-signatures/hse-handbook-signatures.module';
import { StatusesModule } from './api/statuses/statuses.module';
import { PositionsModule } from './api/positions/positions.module';
import { OrgStructuresModule } from './api/org-structures/org-structures.module';
import { S3Module } from './api/s3/s3.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDataSourceOptions(configService),
      inject: [ConfigService]
    }),
    AuthModule,
    HseRoutinesModule,
    HseRoutineCategoriesModule,
    HseRoutineTemplatesModule,
    CompanyHseRoutineCategoriesModule,
    CompanyHseRoutineTemplatesModule,
    AssignedHseRoutinesModule,
    HseRisksModule,
    HseRiskCategoriesModule,
    HseRiskTemplatesModule,
    CompanyHseRiskTemplatesModule,
    AssignedHseRisksModule,
    CompaniesModule,
    ProjectsModule,
    HseHandbookModule,
    CountriesModule,
    HseHandbookSignaturesModule,
    StatusesModule,
    PositionsModule,
    OrgStructuresModule,
    S3Module
  ],
  controllers: [AppController],
})
export class AppModule {
}
