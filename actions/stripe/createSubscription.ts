/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use server';

import APP_PATHS from '@/config/path.config';
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { ErrorHandler } from '@/lib/error';
import { stripe } from '@/lib/stripe/stripe';
import { planTypes } from '@prisma/client';
import { redirect } from 'next/navigation';

export const createSubscription = async (type: planTypes): Promise<never> => {
	const user = await getCurrentUser();

	if (!user) {
		throw new ErrorHandler('Unauthorized: Please Login or Register!', 'UNAUTHORIZED');
	}

	const plans = {
		[planTypes.starter]: process.env.SRTIPE_STARTER_SUBCRIPTION,
		[planTypes.pro]: process.env.SRTIPE_PRO_SUBCRIPTION,
		[planTypes.free]: 'free',
	};

	const priceId = plans[type];

	if (!priceId) {
		throw new ErrorHandler('Subscription price ID not found!', 'BAD_REQUEST');
	}

	if (priceId === 'free') {
		throw new ErrorHandler('Free plan cannot be subscribe', 'BAD_REQUEST');
	}

	const stripeSession = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			{
				price: priceId,
				quantity: 1,
			},
		],
		mode: 'subscription',
		success_url: `${process.env.NEXT_PUBLIC_URL}${APP_PATHS.DASHBOARD}`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}${APP_PATHS.HOME}`,
		client_reference_id: user.id,
	});

	redirect(stripeSession.url ?? '');
};

export const getSubscriptionStatus = async (): Promise<boolean> => {
	const user = await getCurrentUser();

	if (!user) {
		return false;
	}

	const subscription = await prisma.subscription.findUnique({
		where: { userId: user.id },
	});

	if (!subscription) {
		return false;
	}

	return subscription.endDate < new Date();
};

export const cancelSubscription = async (): Promise<void> => {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error('Unauthorized: Please Login or Register!');
	}

	const cancelSubscription = await prisma.subscription.findUnique({
		where: { userId: user?.id },
	});

	if (!cancelSubscription) {
		throw new Error('Did not find any subscriptions');
	}

	await stripe.subscriptions.cancel(cancelSubscription.subscriptionId ?? '');
};
