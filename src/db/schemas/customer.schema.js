import { EntitySchema } from 'typeorm';
import Customer from '../../models/customer.model';

const CustomerSchema = new EntitySchema({
    name: 'Customer',
    target: Customer,
    tableName: 'customers',
    columns: {
        id: {
            type: 'varchar',
            length: 64,
            unique: true,
            generated: 'uuid',
            nullable: false,
            primary: true,
        },
        fullname: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        email: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        password: {
            type: 'varchar',
            length: 100,
            nullable: false
        },
        birthdate: {
            type: 'date',
            nullable: false,
        },
        balance: {
            type: 'int',
            nullable: false,
            default: 0
        },
        points: {
            type: 'int',
            nullable: false,
            default: 0,
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
});

export default CustomerSchema;