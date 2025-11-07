import express from 'express';
import { addExpense, deleteExpense, getAllExpense, getExpense, updateExpense } from '../controllers/expense.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/expense", auth, addExpense);
router.get("/expense",auth , getAllExpense);
router.get("/expense/:id", auth, getExpense);
router.put("/expense/:id", auth, updateExpense);
router.delete("/expense/:id", deleteExpense);

export default router;