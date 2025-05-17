import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432'),
        dialect: 'postgres',
        logging: false, 
    },
);

sequelize.authenticate()
    .then(() => console.log('Banco de dados conectado'))
    .catch((err: Error) =>
        console.error('Erro ao conectar banco de dados', err),
    );

export { sequelize };
