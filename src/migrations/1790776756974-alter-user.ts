import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
} from "typeorm";

export class AlterUser1790776756974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "emailVerified",
        type: "boolean",
        isNullable: false,
        default: false,
      }),
    );

    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "image",
        type: "text",
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "createdAt",
        type: "timestamptz",
        isNullable: false,
        default: "CURRENT_TIMESTAMP",
      }),
    );

    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "updatedAt",
        type: "timestamptz",
        isNullable: false,
        default: "CURRENT_TIMESTAMP",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("user", "emailVerified");
    await queryRunner.dropColumn("user", "image");
    await queryRunner.dropColumn("user", "createdAt");
    await queryRunner.dropColumn("user", "updatedAt");
  }
}
