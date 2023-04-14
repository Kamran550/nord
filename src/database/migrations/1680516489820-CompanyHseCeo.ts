import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyHseCeo1680516489820 implements MigrationInterface {
    name = 'CompanyHseCeo1680516489820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`is_hse_visible\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD \`hse_ceo_user_uuid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`companies\` ADD CONSTRAINT \`FK_1669f7a2736e0363fdc7f9e95f3\` FOREIGN KEY (\`hse_ceo_user_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`companies\` DROP FOREIGN KEY \`FK_1669f7a2736e0363fdc7f9e95f3\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`hse_ceo_user_uuid\``);
        await queryRunner.query(`ALTER TABLE \`companies\` DROP COLUMN \`is_hse_visible\``);
    }

}
