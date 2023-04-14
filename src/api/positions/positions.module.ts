import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { PositionTranslation } from './entities/position.translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position, PositionTranslation])],
  controllers: [PositionsController],
  providers: [PositionsService]
})
export class PositionsModule {}
