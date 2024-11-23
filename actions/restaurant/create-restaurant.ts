/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use server';
import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler } from '@/lib/error';
import { generateUniqueFourDigitNumber } from '@/lib/generateUniqueFourDigitNumber';
import { getRestaurantByBranchName } from '@/lib/restaurant/restaurant';
import { SuccessResponse } from '@/lib/success';
import { RestaurantSchema } from '@/schemas/schema';
import { type RestaurantSchemaType } from '@/schemas/types';
import { type ServerActionReturnType } from '@/types/api.types';
import { canAddRestaurant } from '@/utils/permissions';
import { type Restaurant } from '@prisma/client';

export const createRestaurant = withServerActionAsyncCatcher<RestaurantSchemaType, ServerActionReturnType>(async (values) => {
	const user = await getCurrentUser();
	const validatedFields = RestaurantSchema.safeParse(values);

	if (!validatedFields.success) {
		throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
	}

	const { fullName, branchName, userId, address, city, country, pinCode, state, clientName, upiID } = validatedFields.data;

	const existingUser = await getUserById(userId);

	if (existingUser === null) {
		throw new ErrorHandler('Invalid User Id Unauthorized', 'UNAUTHORIZED');
	}

	const existingRestaurant = await getRestaurantByBranchName(branchName);

	if (existingRestaurant !== null) {
		throw new ErrorHandler('Restaurant with same Branch Name already exists!', 'BAD_REQUEST');
	}

	if (!user) {
		throw new ErrorHandler('Invalid User!', 'BAD_REQUEST');
	}

	const restaurantId = `R-${generateUniqueFourDigitNumber()}`;

	const restaurants: Restaurant[] = await prisma.restaurant.findMany({
		where: { userId },
	});

	try {
		if (canAddRestaurant(user, restaurants)) {
			const res = await prisma.restaurant.create({
				data: {
					fullName,
					branchName,
					restaurantId,
					state,
					address,
					city,
					country,
					pinCode,
					ClientName: clientName,
					upiId: upiID,
					user: {
						connect: { id: userId },
					},
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					fullName: true,
					branchName: true,
					userId: true,
					restaurantId: true,
					ClientName: true,
				},
			});

			return new SuccessResponse('Your Restaurant has been successfully Registered!', 201, res).serialize();
		} else {
			throw new ErrorHandler(
				'You’ve reached the limit of your current plan. To add more restaurants and unlock additional features, please upgrade to a higher plan.',
				'INSUFFICIENT_PERMISSIONS'
			);
		}
	} catch (error: any) {
		throw new ErrorHandler(error.message as string, 'INTERNAL_SERVER_ERROR');
	}
});
