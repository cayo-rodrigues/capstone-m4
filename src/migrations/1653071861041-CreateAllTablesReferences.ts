import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreateAllTablesReferences1653071861041
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "employeesFK",
        columnNames: ["employee_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "employees",
      })
    );

    await queryRunner.createForeignKey(
      "orders",
      new TableForeignKey({
        name: "billsFK",
        columnNames: ["bill_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "bills",
      })
    );

    await queryRunner.createForeignKey(
      "orders_products",
      new TableForeignKey({
        name: "ordersFK",
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "orders",
      })
    );

    await queryRunner.createForeignKey(
      "orders_products",
      new TableForeignKey({
        name: "productsFK",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
      })
    );

    await queryRunner.createForeignKey(
      "product_feedbacks",
      new TableForeignKey({
        name: "productsFK",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
      })
    );

    await queryRunner.createForeignKey(
      "products_ingredients",
      new TableForeignKey({
        name: "productsFK",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
      })
    );

    await queryRunner.createForeignKey(
      "products_ingredients",
      new TableForeignKey({
        name: "ingredientsFK",
        columnNames: ["ingredient_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "ingredients",
      })
    );

    await queryRunner.createForeignKey(
      "products_categories",
      new TableForeignKey({
        name: "productsFK",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
      })
    );

    await queryRunner.createForeignKey(
      "products_categories",
      new TableForeignKey({
        name: "categoriesFK",
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders", "employeesFK");
    await queryRunner.dropForeignKey("orders", "billsFK");
    await queryRunner.dropForeignKey("orders_products", "ordersFK");
    await queryRunner.dropForeignKey("orders_products", "productsFK");
    await queryRunner.dropForeignKey("product_feedbacks", "productsFK");
    await queryRunner.dropForeignKey("products_ingredients", "productsFK");
    await queryRunner.dropForeignKey("products_ingredients", "ingredientsFK");
    await queryRunner.dropForeignKey("products_categories", "productsFK");
    await queryRunner.dropForeignKey("products_categories", "categoriesFK");
  }
}
