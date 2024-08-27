import express from 'express';
import { 
    createModule,
     getAllModules, 
     getModuleById, 
     updateModule, 
     deleteModule 
    } from '../controllers/moduleController.js';
import { protect, ensureAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();


//routes

router.post('/', protect, ensureAdmin, createModule);

router.get('/', protect, getAllModules);

router.get('/:id', protect, getModuleById);

router.put('/:id', protect, ensureAdmin, updateModule);

router.delete('/:id', protect, ensureAdmin, deleteModule);

export default router;