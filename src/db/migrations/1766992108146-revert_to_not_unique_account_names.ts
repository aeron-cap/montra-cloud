import { MigrationInterface, QueryRunner } from 'typeorm';

export class RevertToNotUniqueAccountNames1766992108146 implements MigrationInterface {
  name = 'RevertToNotUniqueAccountNames1766992108146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_2db43cdbf7bb862e577b5f540c8"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "UQ_2db43cdbf7bb862e577b5f540c8" UNIQUE ("name")`,
    );
  }
}
