import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueNamesForAccounts1766991162087 implements MigrationInterface {
  name = 'UniqueNamesForAccounts1766991162087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "UQ_2db43cdbf7bb862e577b5f540c8" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_2db43cdbf7bb862e577b5f540c8"`,
    );
  }
}
