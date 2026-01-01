import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTransactionsTable1767068975038 implements MigrationInterface {
  name = 'InitTransactionsTable1767068975038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "dateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "transaction_category_id" integer NOT NULL, "transaction_category_name" character varying NOT NULL, "amount" integer NOT NULL, "transaction_name" character varying NOT NULL, "transaction_note" character varying NOT NULL, "transaction_type_id" integer NOT NULL, "transaction_type_name" character varying NOT NULL, "account_to_deduct_id" integer, "account_to_deduct_name" character varying, "budget_id" integer, "budget_name" character varying, "account_to_add_id" integer, "account_to_add_name" character varying, "number_of_installment" integer, "total_installment_amount" integer, "fee" integer, "user_id" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
