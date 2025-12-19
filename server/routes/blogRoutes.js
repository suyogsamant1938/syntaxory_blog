import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
	listBlogs,
	getBlog,
	createBlog,
	updateBlog,
	deleteBlog,
} from '../controllers/blogController.js';
import { requirePaidUser } from "../middleware/requirePaid.js";

// Blog CRUD routes
const router = express.Router();

// Public: get all blogs
router.get('/', listBlogs);

// Public: get blog by id
router.get('/:id', getBlog);

// Protected: create a blog
router.post('/', authenticate, requirePaidUser, createBlog);

// Protected: update a blog (owner only)
router.put('/:id', authenticate, requirePaidUser, updateBlog);

// Protected: delete a blog (owner only)
router.delete('/:id', authenticate, requirePaidUser, deleteBlog);

export default router;
