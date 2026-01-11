import { MigrationInterface, QueryRunner } from 'typeorm';

export class SoftDeleteForAccounts1768120396883 implements MigrationInterface {
  name = 'SoftDeleteForAccounts1768120396883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "deletedAt"`);
  }
}
