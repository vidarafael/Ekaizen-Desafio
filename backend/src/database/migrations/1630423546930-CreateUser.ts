import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1630423546930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: "nameClientContact",
                        type: 'varchar',
                    },
                    {
                        name: 'emailContact',
                        type: 'varchar',     
                    },
                    {
                        name: 'telephoneContact',
                        type: 'varchar'
                    },
                    {
                        name: 'nameFantasyContact',
                        type: 'varchar'
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'telephoneCommercial',
                        type: 'varchar'
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar'
                    },
                    {
                        name: 'cep',
                        type: 'int'
                    },
                    {
                        name: 'address',
                        type: 'varchar'
                    },
                    {
                        name: 'district',
                        type: 'varchar'
                    },
                    {
                        name: 'city',
                        type: 'varchar'
                    },
                    {
                        name: 'state',
                        type: 'varchar'
                    },
                    {
                        name: 'companySize',
                        type: 'varchar'
                    },
                    {
                        name: 'quantityEmployees',
                        type: 'int'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
