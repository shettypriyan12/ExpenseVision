import express from 'express';
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.controller.js';
import { forgotPassword, login, resetPassword, signup } from '../controllers/auth.controller.js';
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/user", addUser);
router.get("/user", auth, getAllUsers);
router.get("/user/:id", auth, getUser);
router.put("/user/:id", auth, updateUser);
router.delete("/user/:id", auth, deleteUser);

router.post("/login", login);
router.post("/sign-up", signup);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;