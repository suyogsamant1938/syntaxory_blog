import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { likeBlog, unlikeBlog, getLikeCount } from '../controllers/likeController.js';

// Routes to like and unlike a blog
const router = express.Router();

// Like a blog (authenticated)
router.post('/:id/like', authenticate, likeBlog);

// Unlike a blog (authenticated)
router.delete('/:id/like', authenticate, unlikeBlog);

// Get like count for a blog (public)
router.get('/:id/likes', getLikeCount);

export default router;