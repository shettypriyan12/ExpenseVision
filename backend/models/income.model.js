import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

const Income = sequelize.define("Income", {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    merchant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: DataTypes.STRING,
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
}, {
    tableName: 'incomes',       
    freezeTableName: true,         
    timestamps: true
});


User.hasMany(Income);
Income.belongsTo(User);

Category.hasMany(Income);
Income.belongsTo(Category);

export default Income;
