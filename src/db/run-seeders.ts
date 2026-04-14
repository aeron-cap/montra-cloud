import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [],
    seeds: [],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})().catch((err) => console.log(err));
