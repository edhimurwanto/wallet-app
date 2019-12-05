import { Router } from 'express';
import CustomerService from '../services/customer.service';

const customerService = new CustomerService();

export default Router()
    .get('/', async (req, res) => {
        try {
            const data = await customerService.findAll();

            res.json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get('/:id', async (req, res) => {
        try {
            const data = await customerService.findOne(req.param.id);

            res.json({ data });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .post('/', async (req, res) => {
        try {

            let customer = { ...req.body };

            customer = await customerService.create(req.body);

            res.status(201).json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .put('/', async (req, res) => {
        try {
            const customer = { ...req.body };

            const updatedCustomer = await customerService.update(customer);
            res.json(updatedCustomer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await customerService.delete(id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })