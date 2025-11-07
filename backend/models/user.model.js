import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    resetToken: DataTypes.STRING,
    resetTokenExpiry: DataTypes.DATE,
}, {
    tableName: 'users',       
    freezeTableName: true,         
    timestamps: true
})

export default User;