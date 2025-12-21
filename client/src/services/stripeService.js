import api from './api';

const stripeService = {
  // Create Stripe checkout session
  createCheckoutSession: async () => {
    const response = await api.post('/stripe/checkout');
    return response.data;
  },
};

export default stripeService;
