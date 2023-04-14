import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyHSERiskTemplates1676988707035 implements MigrationInterface {
    name = 'CompanyHSERiskTemplates1676988707035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company_hse_risk_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`company_hse_risk_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_hse_risk_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category_uuid\` varchar(255) NOT NULL, \`hse_risk_template_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`is_visible\` tinyint NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates_translations\` ADD CONSTRAINT \`FK_98e8c1e0682136bd9ad0d09bdfb\` FOREIGN KEY (\`company_hse_risk_template_uuid\`) REFERENCES \`company_hse_risk_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` ADD CONSTRAINT \`FK_057319e6328550152a5ffe0dc2c\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` ADD CONSTRAINT \`FK_acfc92adbf0c6b1d8a7d8328145\` FOREIGN KEY (\`hse_risk_template_uuid\`) REFERENCES \`hse_risk_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` DROP FOREIGN KEY \`FK_acfc92adbf0c6b1d8a7d8328145\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` DROP FOREIGN KEY \`FK_057319e6328550152a5ffe0dc2c\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates_translations\` DROP FOREIGN KEY \`FK_98e8c1e0682136bd9ad0d09bdfb\``);
        await queryRunner.query(`DROP TABLE \`company_hse_risk_templates\``);
        await queryRunner.query(`DROP TABLE \`company_hse_risk_templates_translations\``);
    }

}
