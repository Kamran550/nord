import { MigrationInterface, QueryRunner } from "typeorm";

export class HSERoutineTemplates1675436312640 implements MigrationInterface {
    name = 'HSERoutineTemplates1675436312640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_routine_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_routine_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hse_routine_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`is_visible\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates_translations\` ADD CONSTRAINT \`FK_6c76f8d6ba20398cc82466be966\` FOREIGN KEY (\`hse_routine_template_uuid\`) REFERENCES \`hse_routine_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates\` ADD CONSTRAINT \`FK_450230ceed4e4f63387aac814e2\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates\` DROP FOREIGN KEY \`FK_450230ceed4e4f63387aac814e2\``);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates_translations\` DROP FOREIGN KEY \`FK_6c76f8d6ba20398cc82466be966\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_templates_translations\``);
    }

}
