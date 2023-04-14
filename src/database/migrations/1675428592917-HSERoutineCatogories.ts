import { MigrationInterface, QueryRunner } from 'typeorm';

export class HSERoutineCatogories1675428592917 implements MigrationInterface {
    name = 'HSERoutineCatogories1675428592917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_routine_categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hse_routine_categories_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_routine_category_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories_translations\` ADD CONSTRAINT \`FK_1037db8ab118e2d7827f0adcd01\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories_translations\` DROP FOREIGN KEY \`FK_1037db8ab118e2d7827f0adcd01\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_categories\``);
    }

}
