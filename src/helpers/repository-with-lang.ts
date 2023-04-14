import { DataSource, EntityTarget, ILike, In, Repository } from "typeorm";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { PaginationParams } from "./pagination.pipe";
import calcTakeAndSkip from "./calc-take-and-skip";
import parseTranslatedObjects from "./parse-translated-objects";
import { ILangOptions } from "../types";
import { FilterParams } from "./filter.pipe";
import applyLanguageFromTranslation from "./apply-language-from-translations";

type SearchParam = {
  keys: string[];
  value: string;
};
export type FindWithLangOptions = {
  lang: string;
  pagination?: PaginationParams;
  search?: SearchParam;
  hasTranslations?: boolean;
  filters?: FilterParams;
};

const formatLang = (obj: any) => {
  if (!obj) return obj;

  const { translations, ...targetCopy } = obj;

  if (translations.length) {
    const { uuid, locale, ...translatableFields } = translations[0];
    Object.keys(translatableFields).forEach((key) => {
      if (Array.isArray(translatableFields[key])) {
        targetCopy[key] = translatableFields[key].map((el, index) => {
          const result = {};
          Object.keys(el).forEach((innerKey) => {
            result[innerKey] = {
              lt: targetCopy[key][index][innerKey],
              ...translations.reduce(
                (s, c) => ({ ...s, [c.locale]: c[key][index][innerKey] }),
                {}
              ),
            };
          });

          return result;
        });
      } else {
        targetCopy[key] = {
          lt: targetCopy[key],
          ...translations.reduce((s, c) => ({ ...s, [c.locale]: c[key] }), {}),
        };
      }
    });
  }

  return targetCopy;
};

const addLangFindOptions = (
  options: any,
  {
    lang,
    search,
    hasTranslations,
  }: { lang: string; search?: SearchParam; hasTranslations?: boolean }
) => {
  // Add 'translations' relation if needed
  if (hasTranslations || lang !== "lt") {
    if (
      Array.isArray(options.relations) &&
      !options.relations.includes("translations")
    ) {
      options.relations.push("translations");
    } else if (!options.relations) {
      options.relations = ["translations"];
    }
  }

  if (lang !== "lt" && !hasTranslations) {
    if (!options.where) options.where = {};
    options.where.translations = { locale: lang };
  }

  // Apply multi language search
  if (search && search.value && search.keys.length) {
    if (!options.where) options.where = {};

    const currentWhere = { ...options.where };
    if (lang === "lt") {
      options.where = search.keys.map((key) => ({
        ...currentWhere,
        [key]: ILike(`%${search.value}%`),
      }));
    } else {
      options.where = search.keys.map((key) => ({
        ...currentWhere,
        translations: {
          ...currentWhere.translations,
          [key]: ILike(`%${search.value}%`),
        },
      }));
    }
  }

  return options;
};

const addFiltersOptions = (options: any, filters = {}) => {
  const filterEntries = Object.entries(filters);
  if (!filterEntries.length) return options;

  if (!options.where) options.where = {};
  filterEntries.forEach(
    ([key, value]: [string, { condition: string; value: any }]) => {
      if (value?.condition === "equals") options.where[key] = value?.value;
    }
  );

  return options;
};

export class RepositoryWithLang<
  T extends { uuid: string },
  K
> extends Repository<T> {
  Entity: EntityTarget<T>;
  dataSource: DataSource;
  TranslateEntity: EntityTarget<K>;

  constructor(
    Entity: EntityTarget<T>,
    dataSource: DataSource,
    TranslateEntity: EntityTarget<K>
  ) {
    super(Entity, dataSource.createEntityManager());

    this.Entity = Entity;
    this.dataSource = dataSource;
    this.TranslateEntity = TranslateEntity;
  }

  async createWithLang<K>(
    createDto: K,
    options: ILangOptions & { relationKey: string }
  ) {
    const { ltEntity, translates } = parseTranslatedObjects(createDto);
    console.log("OPTIONS:", options);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const entity = await queryRunner.manager.create(this.Entity, ltEntity);
      await queryRunner.manager.save(entity);

      for (const translate of translates) {
        const translateEntity = await queryRunner.manager.create(
          this.TranslateEntity,
          { ...translate, [options.relationKey]: entity }
        );
        await queryRunner.manager.save(translateEntity);
      }

      await queryRunner.commitTransaction();

      return this.findOneWithLang({
        where: { uuid: entity.uuid },
        lang: options.lang,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createMultipleWithLang<K>(
    createDtos: K[],
    options: ILangOptions & { relationKey: string }
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const uuids = [];

      for (const createDto of createDtos) {
        const { ltEntity, translates } = parseTranslatedObjects(createDto);

        const entity = await queryRunner.manager.create(this.Entity, ltEntity);
        await queryRunner.manager.save(entity);

        for (const translate of translates) {
          const translateEntity = await queryRunner.manager.create(
            this.TranslateEntity,
            { ...translate, [options.relationKey]: entity }
          );
          await queryRunner.manager.save(translateEntity);
        }

        uuids.push(entity.uuid);
      }

      await queryRunner.commitTransaction();
      const result = await this.findAndCountWithLang({
        where: { uuid: In(uuids) } as any,
        lang: options.lang,
      });

      return result.data;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findOneWithLang(
    options: FindOneOptions<T> & FindWithLangOptions
  ): Promise<T | null> {
    const { lang, hasTranslations, filters, ...rest } = options;
    const target = await this.findOne(
      addLangFindOptions(rest, { lang, hasTranslations })
    );

    if (hasTranslations) return formatLang(target);
    return applyLanguageFromTranslation(target, lang);
  }

  async findAndCountWithLang(
    options: FindManyOptions<T> & FindWithLangOptions
  ): Promise<{ data: T[]; meta: { total: number } }> {
    const { lang, pagination, search, filters, ...rest } = options;

    console.log('PAGINATION:',pagination);
    
    const [data, total] = await this.findAndCount({
      ...addFiltersOptions(addLangFindOptions(rest, { lang, search }), filters),
      ...calcTakeAndSkip(pagination),
    });

    return {
      data: data.map((el) => applyLanguageFromTranslation(el, lang)),
      meta: {
        total: total,
      },
    };
  }

  async updateWithLang<K>(
    target: T,
    updateDto: K,
    options: ILangOptions & { relationKey: string }
  ) {
    const { ltEntity, translates } = parseTranslatedObjects(updateDto);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        this.Entity,
        { uuid: target.uuid },
        ltEntity
      );

      for (const translate of translates) {
        await queryRunner.manager.update(
          this.TranslateEntity,
          { locale: translate.locale, [options.relationKey]: target },
          translate
        );
      }

      await queryRunner.commitTransaction();

      return this.findOneWithLang({
        where: { uuid: target.uuid } as any,
        lang: options.lang,
      });
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
