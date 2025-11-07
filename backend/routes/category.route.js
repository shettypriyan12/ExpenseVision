import express from 'express';
import { addCategory, getCategories } from '../controllers/category.controller.js';

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", addCategory);

export default router;