import { MigrationInterface, QueryRunner } from "typeorm";

export class HseHandbookSignature1680617384548 implements MigrationInterface {
    name = 'HseHandbookSignature1680617384548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_handbook_signatures\` (\`uuid\` varchar(36) NOT NULL, \`user_uuid\` varchar(255) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`handbook_uuid\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`signature\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_signatures\` ADD CONSTRAINT \`FK_a82ee3de38d0400e5a67553a6e4\` FOREIGN KEY (\`user_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_signatures\` ADD CONSTRAINT \`FK_aef05242ba669c9792b7273fe2d\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_signatures\` ADD CONSTRAINT \`FK_a38fdfd61be3e60d9c401ce2a3e\` FOREIGN KEY (\`handbook_uuid\`) REFERENCES \`hse_handbooks\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_handbook_signatures\` DROP FOREIGN KEY \`FK_a38fdfd61be3e60d9c401ce2a3e\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_signatures\` DROP FOREIGN KEY \`FK_aef05242ba669c9792b7273fe2d\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_signatures\` DROP FOREIGN KEY \`FK_a82ee3de38d0400e5a67553a6e4\``);
        await queryRunner.query(`DROP TABLE \`hse_handbook_signatures\``);
    }

}
