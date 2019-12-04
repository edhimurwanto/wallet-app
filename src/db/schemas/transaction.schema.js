import { EntitySchema } from 'typeorm';
import Transaction from '../../models/transaction.model';

const TransactionSchema = new EntitySchema({
    name: 'Transaction',
    target: Transaction,
    tableName: 'transactions',
    columns: {
        id: {
            type: 'varchar',
            length: 64,
            unique: true,
            generated: 'uuid',
            nullable: false,
            primary: true,
        },
        type: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        amount: {
            type: 'int',
            nullable: false,
        },
        transactionDate: {
            name: 'trx_date',
            type: 'timestamp',
            createDate: true,
        },
        createdAt: {
            name: 'created_at',
            type: 'timestamp',
            createDate: true,
        },
        updatedAt: {
            name: 'updated_at',
            type: 'timestamp',
            updateDate: true,
        },
    },
    relations: {
        sender: {
            target: 'Customer',
            type: 'many-to-one',
            joinTable: true,
            inverseSide: 'sender',
            eager: true
        },
        receiver: {
            target: 'Customer',
            type: 'many-to-one',
            joinTable: true,
            inverseSide: 'receiver',
            eager: true
        }
    }
});

export default TransactionSchema;