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

// Verify Stripe checkout session and update user role if successful
export const verifySession = async (req, res) => {
	const { sessionId } = req.body;
	const userId = req.user?.id;

	if (!sessionId) return res.status(400).json({ error: 'Missing session ID' });
	if (!userId) return res.status(401).json({ error: 'Unauthorized' });

	try {
		// 1. Retrieve the session from Stripe
		const session = await stripeClient.checkout.sessions.retrieve(sessionId);

		// 2. Security check: Ensure this session belongs to the requesting user
		if (session.metadata?.userId !== userId) {
			return res.status(403).json({ error: 'Unauthorized session access' });
		}

		// 3. Check if payment was successful
		if (session.payment_status === 'paid' || session.status === 'complete') {
			const subscriptionId = session.subscription;

			if (subscriptionId) {
				const subscription = await stripeClient.subscriptions.retrieve(subscriptionId);
				const status = subscription.status;
				const startDate = subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null;
				const endDate = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

				// Update database (mirroring webhook logic)
				// UsesupabaseAdmin for service-role access (bypass RLS)
				const { supabaseAdmin } = await import('../config/supabase.js');

				await supabaseAdmin
					.from('subscriptions')
					.upsert([
						{
							user_id: userId,
							stripe_subscription_id: subscriptionId,
							status,
							start_date: startDate,
							end_date: endDate,
						},
					], { onConflict: 'stripe_subscription_id' });

				const newRole = status === 'active' || status === 'trialing' ? 'PAID_SUBSCRIBER' : 'USER';
				await supabaseAdmin.from('profiles').update({ role: newRole }).eq('id', userId);

				return res.status(200).json({ 
					success: true, 
					role: newRole,
					status: status
				});
			}
		}

		res.status(400).json({ success: false, message: 'Payment not completed' });
	} catch (err) {
		console.error('Verify session error:', err);
		res.status(500).json({ error: err.message });
	}
};

export default { createCheckoutSession, verifySession };