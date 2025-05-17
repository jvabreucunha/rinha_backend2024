import express from 'express';
import { sequelize } from './config/database';
import routes from './routes';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(routes);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error('Erro ao sincronizar com o banco:', err);
    });
