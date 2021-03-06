import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1643165271671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,                        
                    },
                    {
                        name: "provider",
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
