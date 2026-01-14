import { AccountClasses } from 'src/entity_types/entities/account_class.entity';
import { ACCOUNT_CLASSES } from 'src/entity_types/entity_types.data';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export default class AccountClassSeeder implements Seeder {
  public async run(dataSoure: DataSource): Promise<any> {
    const repository = dataSoure.getRepository(AccountClasses);
    const accountClassesData = ACCOUNT_CLASSES;

    for (let i = 0; i < accountClassesData.length; i++) {
      const ac = accountClassesData[i];
      const oldData = await repository.findOneBy({
        name: ac.name,
      });

      if (oldData) {
        oldData.name = ac.name;
        oldData.accent_color = ac.accent_color;
        oldData.accent_color = ac.accent_color;
        await repository.save(oldData);
      } else {
        await repository.insert(ac);
      }
    }
  }
}
