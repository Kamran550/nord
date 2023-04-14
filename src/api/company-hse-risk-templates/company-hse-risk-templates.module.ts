import { Module } from '@nestjs/common';
import { CompanyHseRiskTemplatesService } from './company-hse-risk-templates.service';
import { CompanyHseRiskTemplatesController } from './company-hse-risk-templates.controller';

@Module({
  controllers: [CompanyHseRiskTemplatesController],
  providers: [CompanyHseRiskTemplatesService]
})
export class CompanyHseRiskTemplatesModule {}
