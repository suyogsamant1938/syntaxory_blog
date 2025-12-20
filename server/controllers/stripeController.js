import { stripeClient, stripePriceId } from '../config/stripe.js';

// Create Stripe checkout session for subscription
// Attach userId in metadata
export const createCheckoutSession = async (req, res) => {
	const userId = req.user?.id;
	if (!userId) return res.status(401).json({ error: 'Unauthorized' });

	const priceId = stripePriceId;
	if (!priceId) return res.status(500).json({ error: 'Missing STRIPE_PRICE_ID' });

	try {
		const session = await stripeClient.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			metadata: { userId },
			success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.FRONTEND_URL}/cancel`,
		});

		res.status(201).json({ url: session.url, id: session.id });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default createCheckoutSession;