import { TransactionTypes } from 'src/entity_types/entities/transaction_type.entity';
import { TRANSACTION_TYPES } from 'src/entity_types/entity_types.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class TransactionTypeSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(TransactionTypes);
    const transactionTypes = TRANSACTION_TYPES;

    for (let i = 0; i < transactionTypes.length; i++) {
      const tt = transactionTypes[i];
      const oldData = await repository.findOneBy({
        name: tt.name,
      });

      if (oldData) {
        oldData.name = tt.name;
        await repository.save(oldData);
      } else {
        await repository.insert(tt);
      }
    }
  }
}
