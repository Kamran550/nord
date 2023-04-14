import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignedHseRoutines1675965816083 implements MigrationInterface {
    name = 'AssignedHseRoutines1675965816083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`assigned_hse_routines\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_uuid\` varchar(255) NULL, \`company_hse_routine_category_uuid\` varchar(255) NULL, \`hse_routine_template_uuid\` varchar(255) NULL, \`company_hse_routine_template_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`project_uuid\` varchar(255) NULL, \`responsible_user_uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`assigned_hse_routines_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`assigned_hse_routine_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_a52f58eff61853555d6d22c5de0\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_406bb21c27e8f0b144018b05a9b\` FOREIGN KEY (\`company_hse_routine_category_uuid\`) REFERENCES \`company_hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_c10f2ee72219a2a0f5383ab3371\` FOREIGN KEY (\`hse_routine_template_uuid\`) REFERENCES \`hse_routine_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_4b6c23df33c227a7268b0361d98\` FOREIGN KEY (\`company_hse_routine_template_uuid\`) REFERENCES \`company_hse_routine_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines_translations\` ADD CONSTRAINT \`FK_726efd60762fbbb488e4969aaa3\` FOREIGN KEY (\`assigned_hse_routine_uuid\`) REFERENCES \`assigned_hse_routines\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines_translations\` DROP FOREIGN KEY \`FK_726efd60762fbbb488e4969aaa3\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_4b6c23df33c227a7268b0361d98\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_c10f2ee72219a2a0f5383ab3371\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_406bb21c27e8f0b144018b05a9b\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_a52f58eff61853555d6d22c5de0\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_routines_translations\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_routines\``);
    }

}
