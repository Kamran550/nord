import { Module } from '@nestjs/common';
import { AssignedHseRisksService } from './assigned-hse-risks.service';
import { AssignedHseRisksController } from './assigned-hse-risks.controller';

@Module({
  controllers: [AssignedHseRisksController],
  providers: [AssignedHseRisksService]
})
export class AssignedHseRisksModule {}
