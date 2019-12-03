import { getRepository as repository } from 'typeorm';
var bcrypt = require('bcrypt');
import Customer from '../models/customer.model';

export default class CustomerService {
    customerRepository() {
        return repository(Customer);
    }

    findAll() {
        return this.customerRepository().find();
    }

    findOne(id) {
        return this.customerRepository().findOne(id);
    }

    findByEmail(email) {
        return this.customerRepository().findOne({email});
    }

    async create(customerData) {
        const { password } = customerData;
        customerData.password = await this.beforeCreate(password);
        return this.customerRepository().save(customerData);
    }

    update(customerData) {
        const id = `${customerData.id}`;
        let customer = this.customerRepository().findOne(id);
        if (customer) return this.customerRepository().save(customerData);

    }

    async beforeCreate(password) {
        const salt = bcrypt.genSaltSync();
        return await bcrypt.hashSync(password, salt);
    }

    async validPassword(password, checkPassword) {
        return await bcrypt.compareSync(password, checkPassword);
    }

    delete(id) {
        return this.customerRepository().delete(id);
    }
}