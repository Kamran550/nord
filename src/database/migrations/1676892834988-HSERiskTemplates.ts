import { MigrationInterface, QueryRunner } from "typeorm";

export class HSERiskTemplates1676892834988 implements MigrationInterface {
    name = 'HSERiskTemplates1676892834988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_risk_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_risk_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hse_risk_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category_uuid\` varchar(255) NOT NULL, \`is_visible\` tinyint NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates_translations\` ADD CONSTRAINT \`FK_9e31001ffdd8e34732c528d25be\` FOREIGN KEY (\`hse_risk_template_uuid\`) REFERENCES \`hse_risk_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates\` ADD CONSTRAINT \`FK_48378dee1129b873f842d00bcd1\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates\` DROP FOREIGN KEY \`FK_48378dee1129b873f842d00bcd1\``);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates_translations\` DROP FOREIGN KEY \`FK_9e31001ffdd8e34732c528d25be\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_templates_translations\``);
    }

}
