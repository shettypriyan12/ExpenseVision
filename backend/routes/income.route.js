import express from 'express';
import { addIncome, deleteIncome, getAllIncome, getIncome, updateIncome } from '../controllers/income.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/income", auth, addIncome);
router.get("/income", auth, getAllIncome);
router.get("/income/:id", auth, getIncome);
router.put("/income/:id", auth, updateIncome);
router.delete("/income/:id", deleteIncome);

export default router; 