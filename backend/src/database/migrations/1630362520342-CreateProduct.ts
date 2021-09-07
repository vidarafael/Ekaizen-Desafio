import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProduct1630362520342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "priceSmallSize",
                        type: "float"
                    },
                    {
                        name: "priceMidSize",
                        type: "float"
                    },
                    {
                        name: "priceLargeSize",
                        type: "float"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
