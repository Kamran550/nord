import { MigrationInterface, QueryRunner } from "typeorm";

export class HSERiskCategories1676469713186 implements MigrationInterface {
    name = 'HSERiskCategories1676469713186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_risk_categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hse_risk_categories_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_risk_category_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories_translations\` ADD CONSTRAINT \`FK_ffd102e3e3c716de7b34df016f5\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories_translations\` DROP FOREIGN KEY \`FK_ffd102e3e3c716de7b34df016f5\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_categories\``);
    }

}
