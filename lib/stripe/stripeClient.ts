import { type Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;
const getStripe = async (): Promise<Stripe | null> => {
	if (stripePromise === null) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');
	}
	return await stripePromise;
};

export default getStripe;
