import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import applyLanguageFromTranslation from '../../helpers/apply-language-from-translations';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusesRepository: Repository<Status>
  ) {}

  async user(lang: string) {
    const resp = await this.statusesRepository.find({
      where: { uuid: Like('user.%') },
      relations: ['translations'],
    });

    return {
      data: resp.map(el => applyLanguageFromTranslation(el, lang))
    };
  }
}
