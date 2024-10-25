import { type Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = async (): Promise<Stripe | null> => {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/strict-boolean-expressions
	if (!stripePromise) {
		stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '');
	}
	return await stripePromise;
};

export default getStripe;
