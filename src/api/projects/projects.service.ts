import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return createProjectDto;
  }

  findAll() {
    return this.projectRepository.findAndCount();
  }

  findOne(id: string) {
    return this.projectRepository.findOneBy({ uuid: id });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return updateProjectDto;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
