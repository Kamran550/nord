import { MigrationInterface, QueryRunner } from "typeorm";

export class HseHandbook1680275171519 implements MigrationInterface {
    name = 'HseHandbook1680275171519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hse_handbook_assigned_routine_translations\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_name\` varchar(255) NULL, \`company_hse_routine_category_name\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_handbook_assigned_routine_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_handbook_assigned_routines\` (\`uuid\` varchar(36) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`project_uuid\` varchar(255) NULL, \`responsible_user_uuid\` varchar(255) NOT NULL, \`last_revised_by_uuid\` varchar(255) NOT NULL, \`last_revised_at\` datetime(6) NOT NULL, \`version\` int NOT NULL, \`hse_routine_category\` varchar(255) NULL, \`company_hse_routine_category\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`assigned_hse_routine_uuid\` varchar(255) NOT NULL, \`hse_handbook_uuid\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_handbooks\` (\`uuid\` varchar(36) NOT NULL, \`template_version\` varchar(255) NOT NULL, \`version\` int NOT NULL, \`safety_type\` varchar(255) NOT NULL, \`safety_representative_uuid\` varchar(255) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`created_by_uuid\` varchar(255) NOT NULL, \`last_revised_by_uuid\` varchar(255) NOT NULL, \`last_revised_at\` datetime NOT NULL, \`company_info\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_handbook_assigned_risks\` (\`uuid\` varchar(36) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`responsible_user_uuid\` varchar(255) NOT NULL, \`last_revised_by_uuid\` varchar(255) NOT NULL, \`last_revised_at\` datetime(6) NOT NULL, \`assessment_date\` datetime NOT NULL, \`status\` int NOT NULL, \`hse_risk_category\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`probability\` int NOT NULL, \`consequences\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`assigned_hse_risk_uuid\` varchar(255) NOT NULL, \`hse_handbook_uuid\` varchar(255) NOT NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_handbook_assigned_risk_translations\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_handbook_assigned_risk_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routine_translations\` ADD CONSTRAINT \`FK_d9bb0c51a8119cb2ad2bae48254\` FOREIGN KEY (\`hse_handbook_assigned_routine_uuid\`) REFERENCES \`hse_handbook_assigned_routines\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` ADD CONSTRAINT \`FK_f5b780cce2ff9143ba3184a332c\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` ADD CONSTRAINT \`FK_6e39deea5bc6311f8ede009d9e0\` FOREIGN KEY (\`project_uuid\`) REFERENCES \`projects\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` ADD CONSTRAINT \`FK_1dcbc54ea6310237c212b2b965b\` FOREIGN KEY (\`responsible_user_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` ADD CONSTRAINT \`FK_2708d084025e2fb51b6a3174ced\` FOREIGN KEY (\`last_revised_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` ADD CONSTRAINT \`FK_513092ae051eb81dfaf134ad504\` FOREIGN KEY (\`hse_handbook_uuid\`) REFERENCES \`hse_handbooks\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` ADD CONSTRAINT \`FK_241bd34aa27a3bcdf61f1857010\` FOREIGN KEY (\`safety_representative_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` ADD CONSTRAINT \`FK_2a9e25c02dbf0f6bd21159534ed\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` ADD CONSTRAINT \`FK_6276b83f50bffa687140ede017f\` FOREIGN KEY (\`created_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` ADD CONSTRAINT \`FK_1f9fafdc35aed4f2c92fbb76b21\` FOREIGN KEY (\`last_revised_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` ADD CONSTRAINT \`FK_2d722a6b3a2df62a420315ef9a3\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` ADD CONSTRAINT \`FK_6e53adc26ca96285ba180609b05\` FOREIGN KEY (\`responsible_user_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` ADD CONSTRAINT \`FK_a77bcc28b80556565e43e4093a1\` FOREIGN KEY (\`last_revised_by_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` ADD CONSTRAINT \`FK_161d8cc84518f1a5d1900b4b3fb\` FOREIGN KEY (\`hse_handbook_uuid\`) REFERENCES \`hse_handbooks\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risk_translations\` ADD CONSTRAINT \`FK_16979c3946fbfc5dc98ad0ddca4\` FOREIGN KEY (\`hse_handbook_assigned_risk_uuid\`) REFERENCES \`hse_handbook_assigned_risks\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risk_translations\` DROP FOREIGN KEY \`FK_16979c3946fbfc5dc98ad0ddca4\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` DROP FOREIGN KEY \`FK_161d8cc84518f1a5d1900b4b3fb\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` DROP FOREIGN KEY \`FK_a77bcc28b80556565e43e4093a1\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` DROP FOREIGN KEY \`FK_6e53adc26ca96285ba180609b05\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_risks\` DROP FOREIGN KEY \`FK_2d722a6b3a2df62a420315ef9a3\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` DROP FOREIGN KEY \`FK_1f9fafdc35aed4f2c92fbb76b21\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` DROP FOREIGN KEY \`FK_6276b83f50bffa687140ede017f\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` DROP FOREIGN KEY \`FK_2a9e25c02dbf0f6bd21159534ed\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbooks\` DROP FOREIGN KEY \`FK_241bd34aa27a3bcdf61f1857010\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` DROP FOREIGN KEY \`FK_513092ae051eb81dfaf134ad504\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` DROP FOREIGN KEY \`FK_2708d084025e2fb51b6a3174ced\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` DROP FOREIGN KEY \`FK_1dcbc54ea6310237c212b2b965b\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` DROP FOREIGN KEY \`FK_6e39deea5bc6311f8ede009d9e0\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routines\` DROP FOREIGN KEY \`FK_f5b780cce2ff9143ba3184a332c\``);
        await queryRunner.query(`ALTER TABLE \`hse_handbook_assigned_routine_translations\` DROP FOREIGN KEY \`FK_d9bb0c51a8119cb2ad2bae48254\``);
        await queryRunner.query(`DROP TABLE \`hse_handbook_assigned_risk_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_handbook_assigned_risks\``);
        await queryRunner.query(`DROP TABLE \`hse_handbooks\``);
        await queryRunner.query(`DROP TABLE \`hse_handbook_assigned_routines\``);
        await queryRunner.query(`DROP TABLE \`hse_handbook_assigned_routine_translations\``);
    }

}
