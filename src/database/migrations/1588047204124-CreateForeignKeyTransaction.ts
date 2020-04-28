import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateForeignKeyTransaction1588046128699
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transaction', 'category');
    await queryRunner.addColumn(
      'transaction',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'transaction',
      new TableForeignKey({
        name: 'TransactionCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transaction', 'TransactionCategory');
    await queryRunner.dropColumn('transaction', 'category_id');
    await queryRunner.addColumn(
      'transaction',
      new TableColumn({
        name: 'category',
        type: 'varchar',
      }),
    );
  }
}
