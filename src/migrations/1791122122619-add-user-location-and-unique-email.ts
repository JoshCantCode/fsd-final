import { type MigrationInterface, type QueryRunner } from "typeorm";

export class AddUserLocationAndUniqueEmail1791122122619 implements MigrationInterface {
  name = "AddUserLocationAndUniqueEmail1791122122619";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "locationId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_user_location" FOREIGN KEY ("locationId") REFERENCES location(id) ON DELETE SET NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_user_email" ON "user" (email)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."IDX_user_email"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_user_location"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "locationId"`);
  }
}
