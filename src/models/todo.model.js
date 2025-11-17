import { DataTypes } from "sequelize";

export default function todoModel (sequelize) {
    const Todo =sequelize.define (
        'todo', 
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
           title : {
                type: DataTypes.STRING(100),
                allowNull: false
           },
           description : {
                type: DataTypes.TEXT,
                allowNull: true
              },
              isCompleted : {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
              }
        }, {
            timestamps: true
        }
    );

    return Todo;
}