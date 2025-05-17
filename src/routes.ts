import express from "express";
import { novaTransacao, emitirExtrato } from "./controllers/transacao.controller";
const routes = express.Router()


routes.post('/clientes/:id/transacoes', novaTransacao)
routes.get('/clientes/:id/extrato', emitirExtrato)


export default routes
