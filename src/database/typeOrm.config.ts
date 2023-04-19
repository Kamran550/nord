import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const getDataSourceOptions = (configService: ConfigService): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST', 'mysqldb'),
  port: configService.get('DB_PORT', 3306),
  username: configService.get('DB_USERNAME', 'nilu'),
  password: configService.get('DB_PASSWORD', 'ap'),
  database: configService.get('DB_DATABASE', 'db'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations_node',
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: configService.get('RUN_MIGRATIONS', 'true') === 'true',
  synchronize: false,
  logging: ['error','warn','log'],
  maxQueryExecutionTime:1000,
  extra:{
    charset:'utf8mb4_unicode_ci'
  }
});

const TypeOrmDataSource = new DataSource(getDataSourceOptions(configService));

export default TypeOrmDataSource;
