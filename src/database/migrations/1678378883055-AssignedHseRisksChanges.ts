import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeHseTablesCollate1678378883055 implements MigrationInterface {
    name = 'ChangeHseTablesCollate1678378883055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`status\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`probability\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`probability\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`consequences\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`consequences\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`consequences\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`consequences\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`probability\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`probability\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`status\` varchar(255) NOT NULL`);
    }

}
