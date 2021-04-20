import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSettings1618937852243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"settings",
                columns:[{
                    name:'id',
                    type:"uuid",
                    isPrimary:true
                },
                {
                    name:"username",
                    type:'varchar'
                },
                {  name:'chat',
                   type:'boolean',
                   default:true,
                },
                {
                   name:'updated_At',
                   type:'timestamp',
                   default:"now()",
                },
                {
                    name:'created_At',
                    type:'timestamp',
                    default:"now()",
            
                 },

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('settings')
    }

}
