import Cliente from '../models/Clientes';
import TransacaoModel from '../models/Transacao';
import { sequelize } from '../config/database';
import { TransacaoDTO, ReturnTransacao, DadosContaDTO, ExtratoDTO, TransacaoExtratoDTO } from '../types';
import Transacao from '../models/Transacao';

export class TransacaoService {
    static async criarTransacao(payload: TransacaoDTO): ReturnTransacao {
        const { clienteId, valor, tipo, descricao } = payload;

        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            throw new Error('NOT_FOUND');
        }

        if (valor <= 0) {
            throw new Error('INVALID_VALUE');
        }

        if (!['c', 'd'].includes(tipo)) {
            throw new Error('INVALID_TYPE');
        }

        if (descricao.length < 1 || descricao.length > 10) {
            throw new Error('INVALID_DESC');
        }

        const novoSaldo = cliente.saldo - valor;

        if (tipo === 'd' && novoSaldo - cliente.limite) {
            throw new Error('INSUFFICIENT_FUNDS');
        }

        await sequelize.transaction(async (t) => {
            await cliente.update({ saldo: novoSaldo }, { transaction: t });
            await TransacaoModel.create({ clienteId, valor, tipo, descricao }, { transaction: t });
        });

        await cliente.reload();
        return {
            limite: cliente.limite,
            saldo: cliente.saldo,
        };
    }

    static async listarDezUltimasTransações(clienteId: number): Promise<TransacaoExtratoDTO[]> {
        const transacoes = (await Transacao.findAll({
            where: { clienteId },
            order: [['realizada_em', 'DESC']],
            limit: 10,
            attributes: ['valor', 'tipo', 'descricao', 'realizada_em'],
            raw: true,
        })) as TransacaoExtratoDTO[];

        return transacoes;
    }

    static async listarExtrato(clienteId: number): Promise<ExtratoDTO> {
        const [ultimas_transacoes, saldo] = await Promise.all([this.listarDezUltimasTransações(clienteId), this.listarDadosDaConta(clienteId)]);

        return {
            saldo,
            ultimas_transacoes,
        };
    }

    static async listarDadosDaConta(clienteId: number): Promise<DadosContaDTO> {
        const dados = await Cliente.findOne({
            where: { clienteId },
            attributes: ['saldo', 'limite'],
        });

        if (!dados) throw new Error('NOT_FOUND');

        return {
            total: dados.saldo,
            data_extrato: new Date(),
            limite: dados.limite,
        };
    }
}
