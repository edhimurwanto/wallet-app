import express from 'express';

import CustomerRoute from './customer.route';
import TransactionRoute from './transaction.route';
import AuthRouter from './auth.router';
import SessionChecker from '../middleware/auth.middleware';

export default express.Router()
    .use('/auth', AuthRouter)
    .use(SessionChecker)
    .use('/customers', CustomerRoute)
    .use('/transactions', TransactionRoute)
    .use((req, res, next) => {
        res.status(404).json({message: 'Not found.'});
    });