export interface TransacaoDTO {
    clienteId: number;
    valor: number;
    tipo: 'c' | 'd';
    descricao: string;
}

export interface DadosContaDTO {
    total: number;
    data_extrato: Date;
    limite: number;
}

export interface TransacaoExtratoDTO {
    valor: number;
    tipo: 'c' | 'd';
    descricao: string;
    realizada_em: Date;
}

export interface ExtratoDTO {
    saldo: DadosContaDTO;
    ultimas_transacoes: TransacaoExtratoDTO[];
}

export type ReturnTransacao = Promise<{ limite: number; saldo: number }>;
