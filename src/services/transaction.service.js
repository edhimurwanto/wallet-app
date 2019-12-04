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
        let { sender, receiver, type, amount } = transactionData;

        receiver = await customerService.findOne(receiver);

        if(!receiver) throw new Error("Invalid receiver id.");

        this.amountCheck(sender, amount);

        const payload = {
            type,
            amount,
            sender,
            receiver,
        }

        console.log(receiver);
        
        sender.balance -= amount;
        receiver.balance = Number(receiver.balance) + Number(amount);
        const transaction = await this.transactionRepository().save(payload);

        await customerService.update(sender); 
        await customerService.update(receiver);
        return transaction;

    }

    amountCheck(sender, amount){
        if(amount > sender.balance) throw new Error('Incuficient balance.');
    }

}