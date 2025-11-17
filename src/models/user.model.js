import { DataTypes } from "sequelize";

export default function userModel (sequelize) {
    const User =sequelize.define (
        'user', 
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING(12),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            role: {
                type: DataTypes.STRING(20),
                allowNull: false,
                defaultValue: 'user'
            }
        }, {
            timestamps: true
        }
    );

    return User;
}