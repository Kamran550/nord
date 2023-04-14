import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyHSERoutineTemplates1675772628199 implements MigrationInterface {
    name = 'CompanyHSERoutineTemplates1675772628199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`company_hse_routine_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_uuid\` varchar(255) NULL, \`company_hse_routine_category_uuid\` varchar(255) NULL, \`hse_routine_template_uuid\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`is_visible\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`company_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates_translations\` ADD CONSTRAINT \`FK_430d69224e7a3203a22967e927a\` FOREIGN KEY (\`company_hse_routine_template_uuid\`) REFERENCES \`company_hse_routine_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_907bfd52117cebcbd9686d0cd52\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_8fb9ec2d9a1f8167639a9a43cc0\` FOREIGN KEY (\`company_hse_routine_category_uuid\`) REFERENCES \`company_hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_89cd3eb86d394ba84acb25dcfda\` FOREIGN KEY (\`hse_routine_template_uuid\`) REFERENCES \`hse_routine_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_89cd3eb86d394ba84acb25dcfda\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_8fb9ec2d9a1f8167639a9a43cc0\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_907bfd52117cebcbd9686d0cd52\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates_translations\` DROP FOREIGN KEY \`FK_430d69224e7a3203a22967e927a\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_templates\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_templates_translations\``);
    }

}
