import { TransactionCategories } from 'src/entity_types/entities/transaction_category.entity';
import { TRANSACTION_CATEGORIES } from 'src/entity_types/entity_types.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class TransactionCategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(TransactionCategories);
    const transactionCategories = TRANSACTION_CATEGORIES;

    for (let i = 0; i < transactionCategories.length; i++) {
      const tc = transactionCategories[i];
      const oldData = await repository.findOneBy({
        name: tc.name,
      });

      if (oldData) {
        oldData.name = tc.name;
        await repository.save(oldData);
      } else {
        await repository.insert(tc);
      }
    }
  }
}
