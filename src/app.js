import express from 'express';
import configure from './config/config';
import createConnection from './db/connection';
import AppRouter from './routes';

configure();
createConnection()
    .then(async (connection) => {
        if (connection.isConnected) {
            console.log('DATABASE CONNECTED');

            const app = express();
            const swaggerUi = require('swagger-ui-express');
            const swaggerDocument = require('./config/swagger.json');
            const morgan = require('morgan');
            const cookieParser = require('cookie-parser');
            const session = require('express-session');

            app.use(morgan('dev'));
            app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
            app.use(express.json());
            app.use(cookieParser());

            app.use(session({
                key: 'foo',
                secret: process.env.SECRET_KEY,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    expires: 600000
                }
            }));

            app.use(AppRouter);
            
            app.listen(process.env.APP_PORT, () => {
                console.log(`Application ${process.env.APP_NAME} successfully started on port ${process.env.APP_PORT}.`);

            });
        } else {
            throw new Error('DATABASE CONNECTION FAILED.');
        }
    })

    .catch((err) => {
        console.log(`Error starting application.`);
        console.error(err);

    });

