import * as z from 'zod';

export const RegisterUserSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(6, {
		message: 'Minimum 6 characters required',
	}),
});

export const LoginUserSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
	code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: 'Minimum 6 characters required',
	}),
});

export const ResetSchema = z.object({
	email: z.string().email({
		message: 'Email is required',
	}),
});

export const RestaurantSchema = z.object({
	fullName: z.string().min(1, {
		message: 'Restaurant Name is required',
	}),
	branchName: z
		.string()
		.min(1, {
			message: 'Restaurant Branch Name is required',
		})
		.regex(
			// eslint-disable-next-line no-useless-escape
			/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]*$/,
			{
				message: 'Branch Name must contain letters, numbers, and can include special characters',
			}
		),
	address: z.string().min(1, {
		message: 'Restaurant Address is required',
	}),
	pinCode: z.string().min(1, {
		message: 'PinCode is Required',
	}),
	city: z.string().min(1, {
		message: 'City is Required',
	}),
	state: z.string().min(1, {
		message: 'State is Required',
	}),
	country: z.string().min(1, {
		message: 'Country is Required',
	}),
	userId: z.string().min(1, {
		message: 'UserId is Required',
	}),
});
