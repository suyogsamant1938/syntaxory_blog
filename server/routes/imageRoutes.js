import express from "express";
import { uploadImage } from "../controllers/imageController.js";
import { authenticate } from "../middleware/auth.js";
import { requirePaidUser } from "../middleware/requirePaid.js";

const router = express.Router();

router.post("/upload-image", authenticate, requirePaidUser, uploadImage);

export default router;
