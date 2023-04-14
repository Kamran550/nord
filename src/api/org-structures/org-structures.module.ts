import { Module } from '@nestjs/common';
import { OrgStructuresService } from './org-structures.service';
import { OrgStructuresController } from './org-structures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgStructure } from './entities/org-structure.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrgStructure])],
  controllers: [OrgStructuresController],
  providers: [OrgStructuresService],
  exports: [OrgStructuresService]
})
export class OrgStructuresModule {}
