import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyHSERoutineCategories1675693056757 implements MigrationInterface {
    name = 'CompanyHSERoutineCategories1675693056757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_categories_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`locale\` varchar(255) NOT NULL, \`company_hse_routine_category_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`company_uuid\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories_translations\` ADD CONSTRAINT \`FK_f03404f42c7c93a22e454f736f9\` FOREIGN KEY (\`company_hse_routine_category_uuid\`) REFERENCES \`company_hse_routine_categories\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories_translations\` DROP FOREIGN KEY \`FK_f03404f42c7c93a22e454f736f9\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_categories\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_categories_translations\``);
    }

}
