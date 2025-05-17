import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Cliente extends Model {
    public id!: number;
    public saldo!: number;
    public limite!: number;
}

Cliente.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    saldo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    limite: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: false,
});

export default Cliente
