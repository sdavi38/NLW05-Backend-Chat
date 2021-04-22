import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateConnections1619101444096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"connections",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true,
                    },
                    {
                        name:"admin_id",
                        type:"uuid",
                        isNullable:true,
                    },
                    {
                        name:"user_id",
                        type:"uuid",
                        
                    },
                     {
                        name:"socket_id",
                        type:"varchar",
                        
                     },
                     {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()" 
                     },
                     {
                        name:"upadated_at",
                        type:"timestamp",
                        default:"now()" 
                     },



                ]
            })
            //criar as chaves estrangeiras//

        )
        await queryRunner.createForeignKey(
            "connections", 
            new TableForeignKey({
                name: "FKConnectionUser",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("connections", "FKConnectionUser")
        await queryRunner.dropTable("connections")
    }

}
