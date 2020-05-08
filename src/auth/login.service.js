import { getRepository as repository } from 'typeorm';
import Customer from '../models/customer.model';
import CustomerService from '../services/customer.service';

const customerService = new CustomerService();

export default class LoginService {
    customerRepository() {
        return repository(Customer);
    }

    async login(form){
        const {email, password} = form;

        const user = await customerService.findByEmail(email);
        
        if(user && await customerService.validPassword(password, user.password)){
            return user;
        } else {
            throw new Error('Invalid login credential.');
        }
    }
}