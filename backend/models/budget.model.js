import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.model.js";
import Category from "./category.model.js";

const Budget = sequelize.define("Budget", {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    month: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
}, {
    tableName: 'budgets',       
    freezeTableName: true,         
    timestamps: true
});


User.hasMany(Budget);
Budget.belongsTo(User);

Category.hasMany(Budget);
Budget.belongsTo(Category);

export default Budget;
