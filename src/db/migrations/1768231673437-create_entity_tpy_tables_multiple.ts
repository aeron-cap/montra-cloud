import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntityTpyTablesMultiple1768231673437 implements MigrationInterface {
  name = 'CreateEntityTpyTablesMultiple1768231673437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction_categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bbd38b9174546b0ed4fe04689c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transaction_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2a49fe7879bf8a02812639cea61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_classes" ("id" SERIAL NOT NULL, "nickname" character varying, "name" character varying NOT NULL, "type" character varying NOT NULL, "accent_color" character varying, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_2d0f7aea058120a1daac12e3b5e" UNIQUE ("name"), CONSTRAINT "PK_6486a99c2934b59d706a6fe74d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "card_networks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_e1ac6cc458869e4293906d1cd68" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "card_networks"`);
    await queryRunner.query(`DROP TABLE "account_classes"`);
    await queryRunner.query(`DROP TABLE "transaction_types"`);
    await queryRunner.query(`DROP TABLE "transaction_categories"`);
  }
}
