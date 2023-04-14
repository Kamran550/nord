import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignedRiskRevisedBy1680272043798 implements MigrationInterface {
    name = 'AssignedRiskRevisedBy1680272043798'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD \`last_revised_by_uuid\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_a8268c6c2b34225b3576f93da91\` FOREIGN KEY (\`last_revised_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_a8268c6c2b34225b3576f93da91\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP COLUMN \`last_revised_by_uuid\``);
    }

}
