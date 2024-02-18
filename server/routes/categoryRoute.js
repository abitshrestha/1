import express from 'express';
import { isAdmin, requiresSignIn } from '../middleware/authmiddleware.js';
import { createCategoryController,getAllCategoryController } from '../controllers/categoryController.js';

const router=express.Router();

router.post('/create-category',requiresSignIn,isAdmin,createCategoryController);

router.get('/get-category',getAllCategoryController);

export default router;