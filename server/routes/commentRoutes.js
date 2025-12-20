import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { addComment, getComments } from '../controllers/commentController.js';

const router = express.Router();

// Add a comment to a blog (authenticated)
router.post('/:id/comments', authenticate, addComment);

// Get comments for a blog (paginated)
router.get('/:id/comments', getComments);

export default router;