import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file in server directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Ensure secret key is available
const stripeSecret = process.env.STRIPE_SECRET_KEY;
if (!stripeSecret) {
	throw new Error('Missing STRIPE_SECRET_KEY in environment');
}

// Initialize Stripe client
const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' });

// Export useful Stripe values
export const stripeClient = stripe;
export const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
export const stripePriceId = process.env.STRIPE_PRICE_ID;

export default stripe;