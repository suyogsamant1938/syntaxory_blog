import express from "express";
import { createCheckoutSession } from "../controllers/stripeController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/checkout", authenticate, createCheckoutSession);

export default router;
