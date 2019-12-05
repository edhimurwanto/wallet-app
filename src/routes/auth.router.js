import { Router } from 'express';
import LoginService from '../auth/login.service';

const loginService = new LoginService();

export default Router()
    .post('/login', async (req, res, next) => {
        try {
            const data = req.body;
            const user = await loginService.login(data);
            req.session.user = user;
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get('/logout', async (req, res) => {

        if (req.session.user && req.cookies.foo) {
            res.clearCookie('foo').json({
                message: 'Logout succes'
            });
        } else {
            res.status(401).json({ message: 'You are not login.' });
        }
    })