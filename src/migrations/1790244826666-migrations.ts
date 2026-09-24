import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migrations1790244826666 implements MigrationInterface {
  name = "Migrations1790244826666";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TYPE "public"."user_role_enum"
            ADD VALUE '2'
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum_old" AS ENUM('0', '1')
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    await queryRunner.query(`
            ALTER TYPE "public"."user_role_enum_old"
            RENAME TO "user_role_enum"
        `);
  }
}
