import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migrations1789983757609 implements MigrationInterface {
  name = "Migrations1789983757609";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "billing" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "cardholder_name" character varying NOT NULL,
                "card_number" character varying NOT NULL,
                "cvc" integer NOT NULL,
                "expiry" character varying NOT NULL,
                CONSTRAINT "PK_d9043caf3033c11ed3d1b29f73c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "location" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "city" character varying NOT NULL,
                "country" character varying NOT NULL,
                CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."user_role_enum" AS ENUM('0', '1')
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "role" "public"."user_role_enum" NOT NULL DEFAULT '0',
                "billingId" uuid,
                CONSTRAINT "REL_e033b6ad4ecddae97a955d355c" UNIQUE ("billingId"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "order" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "arrival" date NOT NULL,
                "departure" date NOT NULL,
                "userId" uuid,
                "listingId" uuid,
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."listing_type_enum" AS ENUM('0', '1', '2', '3')
        `);
    await queryRunner.query(`
            CREATE TABLE "listing" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "type" "public"."listing_type_enum" NOT NULL DEFAULT '0',
                "price" double precision NOT NULL,
                "available" boolean NOT NULL,
                "locationId" uuid,
                CONSTRAINT "PK_381d45ebb8692362c156d6b87d7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_e033b6ad4ecddae97a955d355cf" FOREIGN KEY ("billingId") REFERENCES "billing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_3696f51d40889191dab4755f0fe" FOREIGN KEY ("listingId") REFERENCES "listing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "listing"
            ADD CONSTRAINT "FK_45fa265dcc8a8eea0b059e11d89" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "listing" DROP CONSTRAINT "FK_45fa265dcc8a8eea0b059e11d89"
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_3696f51d40889191dab4755f0fe"
        `);
    await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_e033b6ad4ecddae97a955d355cf"
        `);
    await queryRunner.query(`
            DROP TABLE "listing"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."listing_type_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "order"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."user_role_enum"
        `);
    await queryRunner.query(`
            DROP TABLE "location"
        `);
    await queryRunner.query(`
            DROP TABLE "billing"
        `);
  }
}
