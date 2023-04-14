import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { StatusTranslation } from './entities/status.translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status, StatusTranslation])],
  controllers: [StatusesController],
  providers: [StatusesService]
})
export class StatusesModule {}
