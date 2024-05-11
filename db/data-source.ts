import { DataSourceOptions, DataSource } from 'typeorm';

const dataSourceOptions: Partial<DataSourceOptions> = {
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/db/migrations/*.js'],
    });
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
      migrations: ['db/migrations/*.ts'],
      migrationsRun: true,
    });
    break;
  case 'production':
    break;

  default:
    throw new Error('Unknown environment');
}

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions);

export { dataSourceOptions };
export default dataSource;
