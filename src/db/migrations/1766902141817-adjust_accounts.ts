import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustAccounts1766902141817 implements MigrationInterface {
  name = 'AdjustAccounts1766902141817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "account_class_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "account_class_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "account_type_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "account_type_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "current_balance" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" ADD "goal_amount" integer`);
    await queryRunner.query(`ALTER TABLE "accounts" ADD "network_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "network_name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "credit_limit" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "cash_advance_limit" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "billing_date" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" ADD "due_date" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD "start_date" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" ADD "end_date" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "due_date"`);
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "billing_date"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "cash_advance_limit"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "credit_limit"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "network_name"`,
    );
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "network_id"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "goal_amount"`);
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "current_balance"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "account_type_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "account_type_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "account_class_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP COLUMN "account_class_id"`,
    );
  }
}
