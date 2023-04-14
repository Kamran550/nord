import { MigrationInterface, QueryRunner } from "typeorm";

export class AssignedHSERisk1677060564904 implements MigrationInterface {
    name = 'AssignedHSERisk1677060564904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`assigned_hse_risk_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`assigned_hse_risk_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`assigned_hse_risks\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category_uuid\` varchar(255) NOT NULL, \`hse_risk_template_uuid\` varchar(255) NULL, \`company_hse_risk_template_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`responsible_user_uuid\` varchar(255) NOT NULL, \`assessment_date\` datetime NOT NULL, \`status\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`probability\` varchar(255) NOT NULL, \`consequences\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risk_translations\` ADD CONSTRAINT \`FK_b3d10947cdf2076e994de211d28\` FOREIGN KEY (\`assigned_hse_risk_uuid\`) REFERENCES \`assigned_hse_risks\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_55a1158287fd918b89c861c4968\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_eb09a3b08bcaf6ac71d52b7ef05\` FOREIGN KEY (\`hse_risk_template_uuid\`) REFERENCES \`hse_risk_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_d05ac1af721802ddf027c566868\` FOREIGN KEY (\`company_hse_risk_template_uuid\`) REFERENCES \`company_hse_risk_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_d05ac1af721802ddf027c566868\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_eb09a3b08bcaf6ac71d52b7ef05\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_55a1158287fd918b89c861c4968\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risk_translations\` DROP FOREIGN KEY \`FK_b3d10947cdf2076e994de211d28\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_risks\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_risk_translations\``);
    }

}
