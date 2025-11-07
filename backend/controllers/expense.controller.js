import Category from "../models/category.model.js";
import Expense from "../models/expense.model.js";
import { success, failure } from "../response.js";

export const addExpense = async (req, res) => {
    const { amount, date, merchant, notes, categoryName } = req.body;
    try {
        const [category] = await Category.findOrCreate({
            where: { name: categoryName, type: "expense" },
        });

        console.log(category);
        

        const expense = await Expense.create({ UserId: req.user.id, CategoryId: category.id, amount, date, merchant, notes });

        return success(res, 201, "Expense input successfull", expense);

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const getAllExpense = async (req, res) => {
    // const { userId } = req.params;
    try {
        const expense = await Expense.findAll({ where: { UserId: req.user.id }, include: Category, });

        if (!expense) {
            return failure(res, 400, "Expense fetch failed");
        }
        // console.log("Fetched expenses:", expense);
        return success(res, 200, "Expense fetch successfull", expense);
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const getExpense = async (req, res) => {

    const { id } = req.params;
    try {

        const expense = await Expense.findByPk(id, { include: Category });
        if (!expense) {
            return failure(res, 404, "Expense not found")
        }
        return success(res, 200, "Expense fetched", expense);

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, date, merchant, notes } = req.body;
    try {
        const [updated] = await Expense.update({ amount, date, merchant, notes }, { where: { id } });

        if (!updated) return failure(res, 404, "Expense not found");

        return success(res, 200, "Expense updated");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Expense.destroy({ where: { id } });

        if (!deleted) return failure(res, 404, "Expense not found");

        return success(res, 200, "Expense deleted");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};
