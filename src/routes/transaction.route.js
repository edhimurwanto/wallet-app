import { Router } from 'express';
import TransactionService from '../services/transaction.service';

const transactionService = new TransactionService();

export default Router()
    .get('/history', async (req, res) => {
        console.log("USER", req.session.user)
        try {

            const myTransactions = await transactionService.history(req.session.user);
            res.json(myTransactions);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
    
    .get('/', async (req, res) => {
        try {
            const data = await transactionService.find();

            res.json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const data = await transactionService.findOne(req.params.id);

            res.json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .post('/', async (req, res) => {
        try {
            let payload = {
                ...req.body,
                sender: req.session.user
            }
            console.log(payload);

            const created = await transactionService.create(payload);

            res.status(201).json(created);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })