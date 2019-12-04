import { Router } from 'express';
import TransactionService from '../services/transaction.service';

const transactionService = new TransactionService();

export default Router()
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
                sender : req.session.user
            }
            console.log(payload);
            
            const created = await transactionService.create(payload);

            res.status(201).json(created);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })