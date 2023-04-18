import { MigrationInterface, QueryRunner } from "typeorm";

export class addUniqueNameField1681824098541 implements MigrationInterface {
    name = 'addUniqueNameField1681824098541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories\` ADD UNIQUE INDEX \`IDX_9970249137e3f8714a8bf2fec9\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories\` DROP INDEX \`IDX_9970249137e3f8714a8bf2fec9\``);
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories\` CHANGE \`name\` \`name\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
    }

}
