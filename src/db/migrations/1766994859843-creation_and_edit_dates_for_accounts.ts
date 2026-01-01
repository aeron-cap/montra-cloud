import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreationAndEditDatesForAccounts1766994859843 implements MigrationInterface {
  name = 'CreationAndEditDatesForAccounts1766994859843';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "createdAt"`);
  }
}
