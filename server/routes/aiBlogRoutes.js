import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { generateAIBlog } from '../controllers/aiBlogController.js';

const router = express.Router();
router.post('/generate', authenticate, generateAIBlog);
export default router;