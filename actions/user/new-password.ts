'use server';

import prisma from '@/db';
import { withServerActionAsyncCatcher } from '@/lib/async-catch';
import { ErrorHandler } from '@/lib/error';
import { getPasswordResetTokenByToken } from '@/lib/auth/password-reset-token';
import { SuccessResponse } from '@/lib/success';
import { getUserByEmail } from '@/lib/auth/user';
import { NewPasswordSchema } from '@/schemas/schema';
import { type NewPasswordType } from '@/schemas/types';
import { type ServerActionReturnType } from '@/types/api.types';
import bcryptjs from 'bcryptjs';

interface NewPasswordActionType {
	values: NewPasswordType;
	token: string | null;
}

export const newPassword = withServerActionAsyncCatcher<NewPasswordActionType, ServerActionReturnType>(async ({ values, token }) => {
	if (token == null) {
		throw new ErrorHandler('Token does not exists!', 'BAD_REQUEST');
	}

	const validatedFields = NewPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		throw new ErrorHandler('Invalid Fields!', 'BAD_REQUEST');
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (existingToken == null) {
		throw new ErrorHandler('Invalid Token!', 'BAD_REQUEST');
	}

	const hasExpired = new Date(existingToken.expires) < new Date();

	if (hasExpired) {
		throw new ErrorHandler('Your token has expired!', 'BAD_REQUEST');
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (existingUser == null) {
		throw new ErrorHandler('Email does not exists!', 'BAD_REQUEST');
	}

	const encryptedPassword = await bcryptjs.hash(password, 10);

	try {
		await prisma.user.update({
			where: { id: existingUser.id },
			data: { encryptedPassword },
		});

		await prisma.passwordResetToken.delete({
			where: { id: existingToken.id },
		});

		return new SuccessResponse('Password Updated!', 201).serialize();
	} catch {
		throw new ErrorHandler('Internal Server Error', 'INTERNAL_SERVER_ERROR');
	}
});
