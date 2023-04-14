import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignedHseRoutinesChanges1680364525151 implements MigrationInterface {
    name = 'AssignedHseRoutinesChanges1680364525151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD \`revised_by_person_uuid\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD \`version\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_d0151163f86fe99db67e2189bd8\` FOREIGN KEY (\`revised_by_person_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_d0151163f86fe99db67e2189bd8\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP COLUMN \`version\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP COLUMN \`revised_by_person_uuid\``);
    }

}
