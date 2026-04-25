import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedRandIdToOptional1777121610780 implements MigrationInterface {
    name = 'ChangedRandIdToOptional1777121610780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "randId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "randId" SET NOT NULL`);
    }

}
