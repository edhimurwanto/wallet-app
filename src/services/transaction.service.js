import { getRepository as repository } from 'typeorm';
import Transaction from '../models/transaction.model';
import CustomerService from './customer.service';

const customerService = new CustomerService();

export default class TransactionService {

    transactionRepository() {
        return repository(Transaction);
    }

    find() {
        return this.transactionRepository().find();
    }

    history(user) {
        console.log(user)
        const { id } = user;
        return this.transactionRepository().find({
            where: {
                sender: id
            }
        })
    }

    findOne(id) {
        return this.transactionRepository().findOne(id);
    }

    async create(transactionData) {
        let { sender, receiver, type, amount } = transactionData;

        receiver = await customerService.findOne(receiver);

        if (!receiver) throw new Error("Invalid receiver id.");

        this.amountCheck(sender, amount);

        const payload = {
            type,
            amount,
            sender,
            receiver,
        }

        sender.balance -= amount;
        receiver.balance = Number(receiver.balance) + Number(amount);
        const transaction = await this.transactionRepository().save(payload);

        if (!transaction) {
            throw new Error('Internal Server Error');
        }

        sender.points += await this.pointCalculations(amount);

        await customerService.update(sender);
        await customerService.update(receiver);
        return transaction;

    }

    amountCheck(sender, amount) {
        if (amount > sender.balance) throw new Error('Incuficient balance.');
    }

    pointCalculations(amount) {
        if (amount >= 10000) {
            return Number(amount) / 10000 * 5;
        } else return 0;
    }

}