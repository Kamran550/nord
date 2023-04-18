import { Module } from '@nestjs/common';
import { HseHandbookService } from './hse-handbook.service';
import { HseHandbookController } from './hse-handbook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Company } from '../companies/entities/company.entity';
import { AssignedHseRisk } from '../assigned-hse-risks/entities/assigned-hse-risk.entity';
import { HseHandbookAssignedRisk } from './entities/hse-handbook-assigned-risk.entity';
import { HseHandbookAssignedRiskTranslation } from './entities/hse-handbook-assigned-risk-translation.entity';
import { HseHandbook } from './entities/hse-handbook.entity';
import { AssignedHseRoutine } from '../assigned-hse-routines/entities/assigned-hse-routine.entity';
import { HseHandbookAssignedRoutine } from './entities/hse-handbook-assigned-routine.entity';
import { HseHandbookAssignedRoutineTranslation } from './entities/hse-handbook-assigned-routine-translation.entity';
import { HseHandbookSignaturesModule } from '../hse-handbook-signatures/hse-handbook-signatures.module';
import { OrgStructuresModule } from '../org-structures/org-structures.module';
import { HseHandbookOrgStructure } from './entities/hse-handbook-org-structure.entity';
import { S3Module } from '../s3/s3.module';
import { HseHandbookSignature } from '../hse-handbook-signatures/entities/hse-handbook-signature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    User, Company, AssignedHseRisk, AssignedHseRoutine, HseHandbook,
    HseHandbookAssignedRisk, HseHandbookAssignedRiskTranslation,
    HseHandbookAssignedRoutine, HseHandbookAssignedRoutineTranslation, HseHandbookOrgStructure,
    HseHandbookSignature
  ]), HseHandbookSignaturesModule, OrgStructuresModule, S3Module],
  controllers: [HseHandbookController],
  providers: [HseHandbookService]
})
export class HseHandbookModule {}
