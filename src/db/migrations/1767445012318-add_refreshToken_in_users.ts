import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenInUsers1767445012318 implements MigrationInterface {
  name = 'AddRefreshTokenInUsers1767445012318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "refreshToken" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_1167f1ebc206b27f4e992aa66d0" FOREIGN KEY ("account_to_deduct_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_dd2364265f3bd8906f93d8675a8" FOREIGN KEY ("account_to_add_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_dd2364265f3bd8906f93d8675a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_1167f1ebc206b27f4e992aa66d0"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
  }
}
