/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use server';

import prisma from '@/db';
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { getUserById } from '@/lib/auth/user';
import { ErrorHandler } from '@/lib/error';
import { SuccessResponse } from '@/lib/success';
import { ProfileSchema } from '@/schemas/schema';
import { type ProfileSchemaType } from '@/schemas/types';
import { type ServerActionReturnType } from '@/types/api.types';

export const updateUser = withServerActionAsyncCatcher<ProfileSchemaType, ServerActionReturnType>(async values => {
	const user = await getCurrentUser();

	if (user?.id === undefined || !user) {
		throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
	}

	const validatedFields = ProfileSchema.safeParse(values);

	if (!validatedFields.success) {
		throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
	}

	const dbUser = await getUserById(user.id);

	if (dbUser == null) {
		throw new ErrorHandler('Unauthorized', 'UNAUTHORIZED');
	}

	try {
		await prisma.user.update({
			where: { id: user.id },
			data: {
				...values,
			},
		});

		return new SuccessResponse('Profile Updated!', 201).serialize();
	} catch (error) {
		throw new ErrorHandler('Internal Server Error', 'INTERNAL_SERVER_ERROR');
	}
});
