import Category from "../models/category.model.js";
import { success, failure } from "../response.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (categories) {
            return success(res, 200, "Categories fetched", categories);
        }
        return failure(res, 400, "No categories found")

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};

export const addCategory = async (req, res) => {
    const { name, type } = req.body;
    try {
        const [category] = await Category.findOrCreate({ where: { name, type } });

        return success(res, 201, "Category created", category);

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
};
