import { createConnection as connect } from 'typeorm';
import entities from './entities';

async function createConnection(){
    const connection = await connect({
        type: process.env.DB_DRIVER,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        synchronize:process.env.DB_SYNC,
        logging:process.env.DB_LOGGING,
        entities: Object.values(entities),
    });

    return connection;
}

export default createConnection;