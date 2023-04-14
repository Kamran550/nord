import { MigrationInterface, QueryRunner } from "typeorm";

export class Hse1678391584870 implements MigrationInterface {
    name = 'Hse1678391584870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`assigned_hse_risk_translations\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_risks\``);
        await queryRunner.query(`DROP TABLE \`company_hse_risk_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`company_hse_risk_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_categories\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_routines_translations\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_routines\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_templates\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_categories\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_categories\``);

        await queryRunner.query(`CREATE TABLE \`hse_routine_categories_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_routine_category_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_routine_categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_categories_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`locale\` varchar(255) NOT NULL, \`company_hse_routine_category_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`company_uuid\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_routine_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_routine_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_routine_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`is_visible\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`company_hse_routine_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`company_hse_routine_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_uuid\` varchar(255) NULL, \`company_hse_routine_category_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`hse_routine_template_uuid\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`is_visible\` tinyint NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`assigned_hse_routines_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`locale\` varchar(255) NOT NULL, \`assigned_hse_routine_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`assigned_hse_routines\` (\`uuid\` varchar(36) NOT NULL, \`hse_routine_category_uuid\` varchar(255) NULL, \`company_hse_routine_category_uuid\` varchar(255) NULL, \`hse_routine_template_uuid\` varchar(255) NULL, \`company_hse_routine_template_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`project_uuid\` varchar(255) NULL, \`responsible_user_uuid\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` blob NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_risk_categories_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_risk_category_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_risk_categories\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_risk_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`hse_risk_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`hse_risk_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category_uuid\` varchar(255) NOT NULL, \`is_visible\` tinyint NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`assigned_hse_risk_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`assigned_hse_risk_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`company_hse_risk_templates_translations\` (\`uuid\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`locale\` varchar(255) NOT NULL, \`company_hse_risk_template_uuid\` varchar(36) NULL, PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`company_hse_risk_templates\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category_uuid\` varchar(255) NOT NULL, \`hse_risk_template_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`is_visible\` tinyint NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`CREATE TABLE \`assigned_hse_risks\` (\`uuid\` varchar(36) NOT NULL, \`hse_risk_category_uuid\` varchar(255) NOT NULL, \`hse_risk_template_uuid\` varchar(255) NULL, \`company_hse_risk_template_uuid\` varchar(255) NULL, \`company_uuid\` varchar(255) NOT NULL, \`responsible_user_uuid\` varchar(255) NOT NULL, \`assessment_date\` datetime NOT NULL, \`status\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`barriers\` json NOT NULL, \`probability\` int NOT NULL, \`consequences\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`uuid\`)) ENGINE=InnoDB COLLATE utf8mb4_unicode_ci`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories_translations\` ADD CONSTRAINT \`FK_1037db8ab118e2d7827f0adcd01\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories_translations\` ADD CONSTRAINT \`FK_f03404f42c7c93a22e454f736f9\` FOREIGN KEY (\`company_hse_routine_category_uuid\`) REFERENCES \`company_hse_routine_categories\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories\` ADD CONSTRAINT \`FK_664ff7bd555dbc72e4ace5506d6\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates_translations\` ADD CONSTRAINT \`FK_6c76f8d6ba20398cc82466be966\` FOREIGN KEY (\`hse_routine_template_uuid\`) REFERENCES \`hse_routine_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates\` ADD CONSTRAINT \`FK_450230ceed4e4f63387aac814e2\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates_translations\` ADD CONSTRAINT \`FK_430d69224e7a3203a22967e927a\` FOREIGN KEY (\`company_hse_routine_template_uuid\`) REFERENCES \`company_hse_routine_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_907bfd52117cebcbd9686d0cd52\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_8fb9ec2d9a1f8167639a9a43cc0\` FOREIGN KEY (\`company_hse_routine_category_uuid\`) REFERENCES \`company_hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_f129fb0d0eacb1d456261471ee3\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` ADD CONSTRAINT \`FK_89cd3eb86d394ba84acb25dcfda\` FOREIGN KEY (\`hse_routine_template_uuid\`) REFERENCES \`hse_routine_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines_translations\` ADD CONSTRAINT \`FK_726efd60762fbbb488e4969aaa3\` FOREIGN KEY (\`assigned_hse_routine_uuid\`) REFERENCES \`assigned_hse_routines\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_a52f58eff61853555d6d22c5de0\` FOREIGN KEY (\`hse_routine_category_uuid\`) REFERENCES \`hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_406bb21c27e8f0b144018b05a9b\` FOREIGN KEY (\`company_hse_routine_category_uuid\`) REFERENCES \`company_hse_routine_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_c10f2ee72219a2a0f5383ab3371\` FOREIGN KEY (\`hse_routine_template_uuid\`) REFERENCES \`hse_routine_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_4b6c23df33c227a7268b0361d98\` FOREIGN KEY (\`company_hse_routine_template_uuid\`) REFERENCES \`company_hse_routine_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_057d5a1e786b8e6d100d88a8af2\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_7c8a07bc08d44c3399d57bb752d\` FOREIGN KEY (\`project_uuid\`) REFERENCES \`projects\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` ADD CONSTRAINT \`FK_3edf702c56bdf323be327f82795\` FOREIGN KEY (\`responsible_user_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories_translations\` ADD CONSTRAINT \`FK_ffd102e3e3c716de7b34df016f5\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates_translations\` ADD CONSTRAINT \`FK_9e31001ffdd8e34732c528d25be\` FOREIGN KEY (\`hse_risk_template_uuid\`) REFERENCES \`hse_risk_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates\` ADD CONSTRAINT \`FK_48378dee1129b873f842d00bcd1\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risk_translations\` ADD CONSTRAINT \`FK_b3d10947cdf2076e994de211d28\` FOREIGN KEY (\`assigned_hse_risk_uuid\`) REFERENCES \`assigned_hse_risks\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates_translations\` ADD CONSTRAINT \`FK_98e8c1e0682136bd9ad0d09bdfb\` FOREIGN KEY (\`company_hse_risk_template_uuid\`) REFERENCES \`company_hse_risk_templates\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` ADD CONSTRAINT \`FK_057319e6328550152a5ffe0dc2c\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` ADD CONSTRAINT \`FK_acfc92adbf0c6b1d8a7d8328145\` FOREIGN KEY (\`hse_risk_template_uuid\`) REFERENCES \`hse_risk_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` ADD CONSTRAINT \`FK_f215090ee936e9ee40fb5476a73\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_55a1158287fd918b89c861c4968\` FOREIGN KEY (\`hse_risk_category_uuid\`) REFERENCES \`hse_risk_categories\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_eb09a3b08bcaf6ac71d52b7ef05\` FOREIGN KEY (\`hse_risk_template_uuid\`) REFERENCES \`hse_risk_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_d05ac1af721802ddf027c566868\` FOREIGN KEY (\`company_hse_risk_template_uuid\`) REFERENCES \`company_hse_risk_templates\`(\`uuid\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_2860e8e1389761e1ba399a92bb7\` FOREIGN KEY (\`company_uuid\`) REFERENCES \`companies\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` ADD CONSTRAINT \`FK_eceffc1c11e4ece5b231c76f8c1\` FOREIGN KEY (\`responsible_user_uuid\`) REFERENCES \`users\`(\`uuid\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_eceffc1c11e4ece5b231c76f8c1\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_2860e8e1389761e1ba399a92bb7\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_d05ac1af721802ddf027c566868\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_eb09a3b08bcaf6ac71d52b7ef05\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risks\` DROP FOREIGN KEY \`FK_55a1158287fd918b89c861c4968\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` DROP FOREIGN KEY \`FK_f215090ee936e9ee40fb5476a73\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` DROP FOREIGN KEY \`FK_acfc92adbf0c6b1d8a7d8328145\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates\` DROP FOREIGN KEY \`FK_057319e6328550152a5ffe0dc2c\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_risk_templates_translations\` DROP FOREIGN KEY \`FK_98e8c1e0682136bd9ad0d09bdfb\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_risk_translations\` DROP FOREIGN KEY \`FK_b3d10947cdf2076e994de211d28\``);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates\` DROP FOREIGN KEY \`FK_48378dee1129b873f842d00bcd1\``);
        await queryRunner.query(`ALTER TABLE \`hse_risk_templates_translations\` DROP FOREIGN KEY \`FK_9e31001ffdd8e34732c528d25be\``);
        await queryRunner.query(`ALTER TABLE \`hse_risk_categories_translations\` DROP FOREIGN KEY \`FK_ffd102e3e3c716de7b34df016f5\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_3edf702c56bdf323be327f82795\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_7c8a07bc08d44c3399d57bb752d\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_057d5a1e786b8e6d100d88a8af2\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_4b6c23df33c227a7268b0361d98\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_c10f2ee72219a2a0f5383ab3371\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_406bb21c27e8f0b144018b05a9b\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines\` DROP FOREIGN KEY \`FK_a52f58eff61853555d6d22c5de0\``);
        await queryRunner.query(`ALTER TABLE \`assigned_hse_routines_translations\` DROP FOREIGN KEY \`FK_726efd60762fbbb488e4969aaa3\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_89cd3eb86d394ba84acb25dcfda\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_f129fb0d0eacb1d456261471ee3\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_8fb9ec2d9a1f8167639a9a43cc0\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates\` DROP FOREIGN KEY \`FK_907bfd52117cebcbd9686d0cd52\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_templates_translations\` DROP FOREIGN KEY \`FK_430d69224e7a3203a22967e927a\``);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates\` DROP FOREIGN KEY \`FK_450230ceed4e4f63387aac814e2\``);
        await queryRunner.query(`ALTER TABLE \`hse_routine_templates_translations\` DROP FOREIGN KEY \`FK_6c76f8d6ba20398cc82466be966\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories\` DROP FOREIGN KEY \`FK_664ff7bd555dbc72e4ace5506d6\``);
        await queryRunner.query(`ALTER TABLE \`company_hse_routine_categories_translations\` DROP FOREIGN KEY \`FK_f03404f42c7c93a22e454f736f9\``);
        await queryRunner.query(`ALTER TABLE \`hse_routine_categories_translations\` DROP FOREIGN KEY \`FK_1037db8ab118e2d7827f0adcd01\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_risks\``);
        await queryRunner.query(`DROP TABLE \`company_hse_risk_templates\``);
        await queryRunner.query(`DROP TABLE \`company_hse_risk_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_risk_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_categories\``);
        await queryRunner.query(`DROP TABLE \`hse_risk_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_routines\``);
        await queryRunner.query(`DROP TABLE \`assigned_hse_routines_translations\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_templates\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_templates\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_templates_translations\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_categories\``);
        await queryRunner.query(`DROP TABLE \`company_hse_routine_categories_translations\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_categories\``);
        await queryRunner.query(`DROP TABLE \`hse_routine_categories_translations\``);
    }

}
