import { MigrationInterface, QueryRunner } from "typeorm";

export class HseHandbookOrgStructure1681392216908 implements MigrationInterface {
    name = 'HseHandbookOrgStructure1681392216908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_handbook_org_structures\` (\`uuid\` varchar(36) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`last_revised_by_uuid\` varchar(255) NOT NULL, \`hse_handbook_uuid\` varchar(255) NOT NULL, \`structure\` json NOT NULL, \`last_revised_at\` datetime(6) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_org_structures\` ADD CONSTRAINT \`FK_fa3dbe8cc32bdfbafb8e7dbd637\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_org_structures\` ADD CONSTRAINT \`FK_1168957e95e51f612efdd9f8f44\` FOREIGN KEY (\`last_revised_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_org_structures\` ADD CONSTRAINT \`FK_88667d5c5f1d9238b72825d1c23\` FOREIGN KEY (\`hse_handbook_uuid\`) REFERENCES \`hse_handbooks\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_handbook_org_structures\` DROP FOREIGN KEY \`FK_88667d5c5f1d9238b72825d1c23\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_org_structures\` DROP FOREIGN KEY \`FK_1168957e95e51f612efdd9f8f44\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_org_structures\` DROP FOREIGN KEY \`FK_fa3dbe8cc32bdfbafb8e7dbd637\``);
        await queryRunner.query(`DROP TABLE \`hse_handbook_org_structures\``);
    }

}
