import { type MigrationInterface, type QueryRunner } from "typeorm";

export class Migrations1791388124752 implements MigrationInterface {
  name = "Migrations1791388124752";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_user_location"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."notification_type_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6', '7')
        `);
    await queryRunner.query(`
            CREATE TABLE "notification" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "message" character varying NOT NULL,
                "type" "public"."notification_type_enum" NOT NULL,
                "metadata" json NOT NULL,
                CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user_watchlist_location" (
                "userId" uuid NOT NULL,
                "locationId" uuid NOT NULL,
                CONSTRAINT "PK_5172c22daacea41617a74d4bd7b" PRIMARY KEY ("userId", "locationId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_d15468941ec92eafee72ae3189" ON "user_watchlist_location" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_cfab60b037bbb6b776d1d45590" ON "user_watchlist_location" ("locationId")
        `);
    await queryRunner.query(`
            CREATE TABLE "user_notifications_notification" (
                "userId" uuid NOT NULL,
                "notificationId" uuid NOT NULL,
                CONSTRAINT "PK_c20252416bdb7d05d0211bd461b" PRIMARY KEY ("userId", "notificationId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_56b86b108a28ba4750417373d9" ON "user_notifications_notification" ("userId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_022bdca3318f2257b5ae15c173" ON "user_notifications_notification" ("notificationId")
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "createdAt"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "updatedAt"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "createdAt"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "session"
            ALTER COLUMN "createdAt"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "verification"
            ALTER COLUMN "createdAt"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "verification"
            ALTER COLUMN "updatedAt"
            SET DEFAULT now()
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_93e37a8413a5745a9b52bc3c0c1" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user_watchlist_location"
            ADD CONSTRAINT "FK_d15468941ec92eafee72ae31892" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_watchlist_location"
            ADD CONSTRAINT "FK_cfab60b037bbb6b776d1d455900" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_notifications_notification"
            ADD CONSTRAINT "FK_56b86b108a28ba4750417373d90" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "user_notifications_notification"
            ADD CONSTRAINT "FK_022bdca3318f2257b5ae15c1738" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_notifications_notification" DROP CONSTRAINT "FK_022bdca3318f2257b5ae15c1738"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_notifications_notification" DROP CONSTRAINT "FK_56b86b108a28ba4750417373d90"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_watchlist_location" DROP CONSTRAINT "FK_cfab60b037bbb6b776d1d455900"
        `);
    await queryRunner.query(`
            ALTER TABLE "user_watchlist_location" DROP CONSTRAINT "FK_d15468941ec92eafee72ae31892"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_93e37a8413a5745a9b52bc3c0c1"
        `);
    await queryRunner.query(`
            ALTER TABLE "verification"
            ALTER COLUMN "updatedAt"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "verification"
            ALTER COLUMN "createdAt"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "session"
            ALTER COLUMN "createdAt"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "createdAt"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "account"
            ALTER COLUMN "id" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "updatedAt"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "createdAt"
            SET DEFAULT CURRENT_TIMESTAMP
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_022bdca3318f2257b5ae15c173"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_56b86b108a28ba4750417373d9"
        `);
    await queryRunner.query(`
            DROP TABLE "user_notifications_notification"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_cfab60b037bbb6b776d1d45590"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_d15468941ec92eafee72ae3189"
        `);
    await queryRunner.query(`
            DROP TABLE "user_watchlist_location"
        `);
    await queryRunner.query(`
            DROP TABLE "notification"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."notification_type_enum"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_user_location" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
  }
}
