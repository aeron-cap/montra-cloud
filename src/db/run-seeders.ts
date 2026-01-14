import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import AccountClassSeeder from './seeds/account_class.seeder';
import { AccountClasses } from 'src/entity_types/entities/account_class.entity';
import { CardNetworks } from 'src/entity_types/entities/card_network.entity';
import CardNetworkSeeder from './seeds/card_network.seeder';

(async () => {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [AccountClasses, CardNetworks],

    seeds: [AccountClassSeeder, CardNetworkSeeder],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
})().catch((err) => console.log(err));
