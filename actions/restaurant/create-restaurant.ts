'use server';
import prisma from '@/db';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler } from '@/lib/error';
import { generateUniqueFourDigitNumber } from '@/lib/generateUniqueFourDigitNumber';
import { getRestaurantByBranchName } from '@/lib/restaurant/restaurant';
import { SuccessResponse } from '@/lib/success';
import { RestaurantSchema } from '@/schemas/schema';
import { type RestaurantSchemaType } from '@/schemas/types';
import { type ServerActionReturnType } from '@/types/api.types';

export const createRestaurant = withServerActionAsyncCatcher<RestaurantSchemaType, ServerActionReturnType>(async (values) => {
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

	const restaurantId = `R-${generateUniqueFourDigitNumber()}`;

	try {
		await prisma.restaurant.create({
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
		});

		return new SuccessResponse('Your Restaurant has been successfully Registered!', 201).serialize();
	} catch {
		throw new ErrorHandler('Internal Server Error', 'INTERNAL_SERVER_ERROR');
	}
});
