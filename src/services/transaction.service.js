import { getRepository as repository } from 'typeorm';
import Transaction from '../models/transaction.model';
import CustomerService from './customer.service';

const customerService = new CustomerService();

export default class TransactionService {

    transactionRepository(){
        return repository(Transaction);
    }

    find(){
        return this.transactionRepository().find();
    }

    findOne(id){
        return this.transactionRepository().findOne(id);
    }

    async create(transactionData){
        const { senderId, receiverId, type, amount } = transactionData;

        const sender = await customerService.findOne(senderId);
        const receiver = await customerService.findOne(receiverId);

        if(!sender) throw new Error("Invalid sender id.");
        if(!receiver) throw new Error("Invalid receiver id.");

        const payload = {
            type,
            amount,
            senderId,
            receiverId,
        }

        return this.transactionRepository().save(payload);

    }

}