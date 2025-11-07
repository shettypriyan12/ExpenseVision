import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";
import Category from "./category.model.js";

const Expense = sequelize.define("Expense", {
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
    tableName: 'expenses',       
    freezeTableName: true,         
    timestamps: true
});


User.hasMany(Expense);
Expense.belongsTo(User);

Category.hasMany(Expense);
Expense.belongsTo(Category);

export default Expense;
