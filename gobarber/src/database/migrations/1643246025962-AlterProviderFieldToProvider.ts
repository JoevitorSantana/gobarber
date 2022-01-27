import { query } from "express";
import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterProviderFieldToProvider1643246025962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true
            }),
        );

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }),
        );

        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
            })
        );

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {        

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider',
            type: 'varchar',
        }));
    }

}
