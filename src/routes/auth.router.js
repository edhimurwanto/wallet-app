import { Router } from 'express';
import LoginService from '../auth/login.service';

const loginService = new LoginService();

export default Router()
    .post('/login', async (req, res, next)=> {
        try {
            const data = req.body;
            const user = await loginService.login(data);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })