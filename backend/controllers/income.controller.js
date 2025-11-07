import Income from "../models/income.model.js";
import Category from "../models/category.model.js";
import { success, failure } from "../response.js";

export const addIncome = async (req, res) => {
    const { amount, date, merchant, notes, categoryName } = req.body;
    try {
        const [category] = await Category.findOrCreate({
            where: { name: categoryName, type: "income" },
        });

        const income = await Income.create({ UserId: req.user.id, CategoryId: category.id, amount, date, merchant, notes });

        return success(res, 201, "Income input successfull", income);

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const getAllIncome = async (req, res) => {
    // const { userId } = req.params;
    try {
        const income = await Income.findAll({ where: { UserId:req.user.id }, include: Category, });

        if (!income) {
            return failure(res, 400, "Income fetch failed");
        }
        // console.log("Fetched incomes:", income);
        return success(res, 200, "Income fetch successfull", income);
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const getIncome = async (req, res) => {

    const { id } = req.params;
    try {

        const income = await Income.findByPk(id, { include: Category });
        if (!income) {
            return failure(res, 404, "Income not found")
        }
        return success(res, 200, "Income fetched", income);

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const updateIncome = async (req, res) => {
    const { id } = req.params;
    const { amount, date, merchant, notes } = req.body;
    try {
        const [updated] = await Income.update({ amount, date, merchant, notes }, { where: { id } });

        if (!updated) return failure(res, 404, "Income not found");

        return success(res, 200, "Income updated");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Income.destroy({ where: { id } });

        if (!deleted) return failure(res, 404, "Income not found");

        return success(res, 200, "Income deleted");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};
