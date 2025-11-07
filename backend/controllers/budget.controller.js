import Budget from "../models/budget.model.js";
import Category from "../models/category.model.js";
import { success, failure } from "../response.js";

export const addBudget = async (req, res) => {
    const { categoryId, amount, month } = req.body;

    try {
        const existingBudget = await Budget.findOne({
            where: { UserId: req.user.id, CategoryId: categoryId, month: month }
        });

        let budget;

        if (existingBudget) {
            existingBudget.amount += amount;
            existingBudget.month = month;
            await existingBudget.save();
            budget = existingBudget;
        } 
        else {
            budget = await Budget.create({ UserId: req.user.id, CategoryId: categoryId, amount, month });
        }

        return success(res, 201, "Budget input successful", budget);
        

    } catch (err) {
        console.error(err);
        return failure(res, 500, "Something went wrong");
    }
};



export const getAllBudget = async (req, res) => {
    // const { userId } = req.params;
    try {
        const budget = await Budget.findAll({ where: { UserId: req.user.id }, include: Category, });

        if (!budget) {
            return failure(res, 400, "Budget fetch failed");
        }
        // console.log("Fetched budgets:", budget);
        return success(res, 200, "Budget fetch successfull", budget);
    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const getBudget = async (req, res) => {

    const { id } = req.params;
    try {

        const budget = await Budget.findByPk(id, { include: Category });
        if (!budget) {
            return failure(res, 404, "Budget not found")
        }
        return success(res, 200, "Budget fetched", budget);

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const updateBudget = async (req, res) => {
    const { id } = req.params;
    const { amount, month } = req.body;
    try {
        const [updated] = await Budget.update({ amount, month }, { where: { id } });

        if (!updated) return failure(res, 404, "Budget not found");

        return success(res, 200, "Budget updated");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Budget.destroy({ where: { id } });

        if (!deleted) return failure(res, 404, "Budget not found");

        return success(res, 200, "Budget deleted");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};
