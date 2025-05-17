import { Request, Response, RequestHandler } from 'express';
import { TransacaoService } from '../services/TransacaoService';
import { TransacaoDTO } from '../types';

export const novaTransacao: RequestHandler = async (req: Request, res: Response) => {
    const clienteId = parseInt(req.params.id, 10);

    if (Number.isNaN(clienteId)) {
        res.status(422).json({ erro: 'ID de cliente inválido' });
        return;
    }

    const { valor, tipo, descricao } = req.body as TransacaoDTO;

    try {
        const resultado = await TransacaoService.criarTransacao({ clienteId, valor, tipo, descricao });
        res.status(200).json(resultado);
        return;
    } catch (err: any) {
        switch (err.message) {
            case 'NOT_FOUND':
                res.status(404).json({ erro: 'Cliente não encontrado' });
                return;
            case 'INSUFFICIENT_FUNDS':
            case 'INVALID_VALUE':
            case 'INVALID_TYPE':
            case 'INVALID_DESC':
                res.status(422).json({ erro: 'Dados inválidos ou saldo insuficiente' });
                return;
            default:
                res.status(500).json({ erro: 'Erro interno' });
                return;
        }
    }
};

export const emitirExtrato: RequestHandler = async (req: Request, res: Response) => {
    const clienteId = parseInt(req.params.id, 10);

    if (Number.isNaN(clienteId)) {
        res.status(422).json({ erro: 'ID de cliente inválido' });
        return;
    }

    try {
        const resultado = await TransacaoService.listarExtrato(clienteId);
        res.status(200).json(resultado);
        return;
    } catch (err: any) {
        switch (err.message) {
            case 'NOT_FOUND':
                res.status(404).json({ erro: 'Cliente não encontrado' });
                return;
            default:
                res.status(422);
                return;
        }
    }
};
