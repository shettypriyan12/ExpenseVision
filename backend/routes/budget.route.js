import express from 'express';
import { addBudget, deleteBudget, getAllBudget, getBudget, updateBudget } from '../controllers/budget.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/budget", auth, addBudget);
router.get("/budget", auth, getAllBudget);
router.get("/budget/:id", auth, getBudget);
router.put("/budget/:id", auth, updateBudget);
router.delete("/budget/:id", deleteBudget);

export default router; 