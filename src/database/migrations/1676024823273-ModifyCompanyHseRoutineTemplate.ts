import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyCompanyHseRoutineTemplate1676024823273 implements MigrationInterface {
    name = 'ModifyCompanyHseRoutineTemplate1676024823273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories\` CHANGE \`company_uuid\` \`company_uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP COLUMN \`company_uuid\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD \`company_uuid\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP COLUMN \`company_uuid\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD \`company_uuid\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories\` CHANGE \`company_uuid\` \`company_uuid\` varchar(255) NULL`);
    }

}
