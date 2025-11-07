import User from "../models/user.model.js";
import { success, failure } from "../response.js";

export const getAllUsers = async (req, res) => {

    try {
        const users = await User.findAll();

        if (users.length > 0) {
            return success(res, 200, "Fetched all Users", users)
        }

        return failure(res, 400, "Fetching failed");

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const addUser = async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });

        return success(res, 201, "User created")

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const getUser = async (req, res) => {

    const { id } = req.params;
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return failure(res, 400, "User not found");
        }
        return success(res, 200, "User found", user)

    } catch (err) {
        return failure(res, 500, "Something went wrong");
    }
}

export const updateUser = async (req, res) => {

    const { id } = req.params;
    const { name, email, password } = req.body;
    try {

        const [updated] = await User.update({ name, email, password }, { where: { id } });

        if (updated === 0) {
            return failure(res, 400, "User not found");
        }
        return success(res, 200, "Userdata updated successfully", updated);

    } catch (err) {
        return failure(res, 500, "Failed to update user");
    }
}

export const deleteUser = async (req, res) => {

    const { id } = req.params;
    try {

        const [deleted] = await User.destroy({ where: { id } });

        if (deleted === 0) {
            return failure(res, 400, "User not found");
        }
        return success(res, 200, "User deleted successfully", id);

    } catch (err) {
        return failure(res, 500, "Failed to delete user");
    }

}