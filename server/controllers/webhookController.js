import { stripeClient, stripeWebhookSecret } from '../config/stripe.js';
import supabaseAdmin from '../config/supabase.js';

// Handle Stripe webhook
// Verify signature
// Update subscription and user role
export default async function webhookHandler(req, res) {
	const sig = req.headers['stripe-signature'];
	const webhookSecret = stripeWebhookSecret;

	if (!webhookSecret) return res.status(500).send('Webhook secret not configured');
	if (!sig) return res.status(400).send('Missing stripe-signature header');

	let event;
	try {
		// req.body must be raw bytes (express.raw middleware)
		event = stripeClient.webhooks.constructEvent(req.body, sig, webhookSecret);
	} catch (err) {
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		const type = event.type;

		if (type === 'checkout.session.completed') {
			const session = event.data.object;
			const userId = session.metadata?.userId;
			const subscriptionId = session.subscription;

			if (userId && subscriptionId) {
				// Retrieve subscription to get status and period dates
				const subscription = await stripeClient.subscriptions.retrieve(subscriptionId);

				const status = subscription.status;
				const startDate = subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null;
				const endDate = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

				// Upsert into subscriptions table
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

				// Update user role based on status
				const newRole = status === 'active' || status === 'trialing' ? 'PAID_SUBSCRIBER' : 'USER';
				await supabaseAdmin.from('profiles').update({ role: newRole }).eq('id', userId);
			}
		}

		if (type === 'customer.subscription.updated' || type === 'customer.subscription.deleted') {
			const subscription = event.data.object;
			const subscriptionId = subscription.id;
			// Try to find local user by stripe_subscription_id
			const { data: subs, error } = await supabaseAdmin
				.from('subscriptions')
				.select('user_id')
				.eq('stripe_subscription_id', subscriptionId)
				.limit(1)
				.single();

			if (!error && subs?.user_id) {
				const userId = subs.user_id;
				const status = subscription.status;
				const startDate = subscription.current_period_start ? new Date(subscription.current_period_start * 1000).toISOString() : null;
				const endDate = subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null;

				await supabaseAdmin
					.from('subscriptions')
					.update({ status, start_date: startDate, end_date: endDate })
					.eq('stripe_subscription_id', subscriptionId);

				const newRole = status === 'active' || status === 'trialing' ? 'PAID_SUBSCRIBER' : 'USER';
				await supabaseAdmin.from('profiles').update({ role: newRole }).eq('id', userId);
			}
		}

		res.status(200).json({ received: true });
	} catch (err) {
		res.status(500).send(`Handler error: ${err.message}`);
	}
}