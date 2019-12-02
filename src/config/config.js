import dotenv from 'dotenv';

function configure(){
    dotenv.config();

    if(!process.env.APP_NAME){
        console.error(`Required environment variables are 
        unavailable or may incorrect loaded.`);
        process.exit(1);
    }
}

export default configure;