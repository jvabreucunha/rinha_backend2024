import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Transacao extends Model {
    public id!: number;
    public clienteId!: number;
    public valor!: number;
    public tipo!: 'c' | 'd';
    public descricao!: string;
    public realizada_em!: Date;
}

Transacao.init(
    {
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        valor: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        tipo: {
            type: DataTypes.ENUM('c', 'd'),
            allowNull: true,
        },
        descricao: {
            type: DataTypes.STRING(10),
        },
        realizada_em: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Transacao',
        tableName: 'transacoes',
        timestamps: false,
    },
);

export default Transacao;
