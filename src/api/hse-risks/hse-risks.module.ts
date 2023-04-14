import { Module } from '@nestjs/common';
import { HseRisksService } from './hse-risks.service';
import { HseRisksController } from './hse-risks.controller';

@Module({
  controllers: [HseRisksController],
  providers: [HseRisksService]
})
export class HseRisksModule {}
