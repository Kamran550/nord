import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { ILangOptions } from '../../types';
import applyLanguageFromTranslation from '../../helpers/apply-language-from-translations';
import formatTranslations from '../../helpers/formatTranslations';


@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionsRepository: Repository<Position>
  ) {}

  async findAll(options?: ILangOptions) {
    const positions = await this.positionsRepository.find({
      relations: ['translations']
    });

    return positions.map(el => applyLanguageFromTranslation(el, options.lang));
  }

  async findOne(id: string, options?: ILangOptions) {
    const position = await this.positionsRepository.findOne({
      where: { uuid: id },
      relations: ['translations']
    });

    if (options.hasTranslations) return formatTranslations(position, 'position_uuid');
    return applyLanguageFromTranslation(position, options.lang);
  }
}
