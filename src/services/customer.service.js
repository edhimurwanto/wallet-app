import { getRepository as repository } from 'typeorm';
import Customer from '../models/customer.model';

export default class CustomerService{
    customerRepository(){
        return repository(Customer);
    }

    findAll(){
        return this.customerRepository().find();
    }

    findOne(id){
        return this.customerRepository().findOne(id);
    }

    create(customerData){
        return this.customerRepository().save(customerData);
    }

    update(customerData){
        const id = `${customerData.id}`;
        let customer = this.customerRepository().findOne(id);
        if(customer) return this.customerRepository().save(customerData);
        
    }

    delete(id){
        return this.customerRepository().delete(id);
    }
}