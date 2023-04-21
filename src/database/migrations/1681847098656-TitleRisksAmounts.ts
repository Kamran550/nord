import { MigrationInterface, QueryRunner } from "typeorm";

export class TitleRisksAmounts1681847098656 implements MigrationInterface {
    name = 'TitleRisksAmounts1681847098656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates\` MODIFY \`name\` varchar(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories\` CHANGE \`name\` \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories\` ADD UNIQUE INDEX \`IDX_61ea26518dbf80f963cf176831\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` MODIFY \`name\` varchar(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` MODIFY \`name\` varchar(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` MODIFY \`name\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` MODIFY \`name\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories\` DROP INDEX \`IDX_61ea26518dbf80f963cf176831\``);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories\` CHANGE \`name\` \`name\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates\` MODIFY \`name\` varchar(255) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
    }

}
