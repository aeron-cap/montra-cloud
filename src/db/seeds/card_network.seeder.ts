import { CardNetworks } from 'src/entity_types/entities/card_network.entity';
import { CARD_NETWORKS } from 'src/entity_types/entity_types.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class CardNetworkSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CardNetworks);
    const cardNetworks = CARD_NETWORKS;

    for (let i = 0; i < cardNetworks.length; i++) {
      const cd = cardNetworks[i];
      const oldData = await repository.findOneBy({
        name: cd.name,
      });

      if (oldData) {
        oldData.name = cd.name;
        // oldData.icon = cd.icon;
        await repository.save(oldData);
      } else {
        await repository.insert(cd);
      }
    }
  }
}
