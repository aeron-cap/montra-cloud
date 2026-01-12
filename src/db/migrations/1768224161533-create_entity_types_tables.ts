import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntityTypesTables1768224161533 implements MigrationInterface {
  name = 'CreateEntityTypesTables1768224161533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bbd38b9174546b0ed4fe04689c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_classes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "accent_color" character varying, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_6486a99c2934b59d706a6fe74d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "accent_color" character varying, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1944ce0e8e4a9f29fa1d4fbe4ce" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "account_types"`);
    await queryRunner.query(`DROP TABLE "account_classes"`);
    await queryRunner.query(`DROP TABLE "transaction_types"`);
    await queryRunner.query(`DROP TABLE "transaction_categories"`);
  }
}
