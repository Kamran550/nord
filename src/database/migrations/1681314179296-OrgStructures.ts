import { MigrationInterface, QueryRunner } from "typeorm";

export class OrgStructures1681314179296 implements MigrationInterface {
    name = 'OrgStructures1681314179296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`org_structures\` (\`uuid\` varchar(36) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`structure\` json NOT NULL, \`last_revised_by_uuid\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_4944bafe297be54c23c10cee5f\` (\`company_uuid\`), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`ALTER TABLE \`org_structures\` ADD CONSTRAINT \`FK_4944bafe297be54c23c10cee5fa\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`org_structures\` ADD CONSTRAINT \`FK_3849ca1d8789d8928ee65529491\` FOREIGN KEY (\`last_revised_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`org_structures\` DROP FOREIGN KEY \`FK_3849ca1d8789d8928ee65529491\``);
        await queryRunner.query(`ALTER TABLE \`org_structures\` DROP FOREIGN KEY \`FK_4944bafe297be54c23c10cee5fa\``);
        await queryRunner.query(`DROP INDEX \`REL_4944bafe297be54c23c10cee5f\` ON \`org_structures\``);
        await queryRunner.query(`DROP TABLE \`org_structures\``);
    }

}
