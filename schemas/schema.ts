import { Availability, MenuType, TableStatus } from '@prisma/client';
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
	clientName: z.string().min(1, {
		message: 'Your Name is required',
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
	upiID: z
		.string()
		.min(1, {
			message: 'UPI ID is required',
		})
		.regex(/^[a-zA-Z0-9.-]{2,256}@[a-zA-Z]{3,64}$/, {
			message: 'Invalid UPI ID',
		}),
	userId: z.string().min(1, {
		message: 'UserId is Required',
	}),
});

export const ProfileSchema = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	isTwoFactorEnabled: z.boolean().optional(),
});

export const AddMenuSchema = z.object({
	name: z.string().min(1, {
		message: 'Dish Name is required',
	}),
	description: z.string().min(1, {
		message: 'Dish Description is required',
	}),
	type: z.enum([MenuType.Vegeterian, MenuType.nonVegeterian]),
	availability: z.enum([Availability.Available, Availability.notAvailable]),
	category: z.string().min(1, {
		message: 'Category is required',
	}),
	amount: z
		.string()
		.refine((value) => value.trim() !== '', {
			message: 'Amount is required',
		})
		.refine(
			(value) => {
				if (value.trim() !== '') {
					const parsedValue = parseInt(value, 10);
					return !isNaN(parsedValue) && parsedValue >= 0;
				}
				return false;
			},
			{
				message: 'Amount must be a number more than 0',
			}
		),
	image: z.array(z.string().min(1)).min(1, {
		message: 'Image is required',
	}),
	isFeatured: z.boolean().optional(),
	restaurantId: z.string().min(1, {
		message: 'Restaurant Id is required',
	}),
});

export const AddTableSchema = z.object({
	tableNumber: z.string().min(1, {
		message: 'Table Number is required',
	}),
	tableSize: z
		.string()
		.refine((value) => value.trim() !== '')
		.refine(
			(value) => {
				if (value.trim() !== '') {
					const parsedValue = parseInt(value, 10);
					return !isNaN(parsedValue) && parsedValue >= 0;
				}
				return false;
			},
			{
				message: 'Table Size must be a number',
			}
		),
	tableStatus: z.enum([TableStatus.Vacant, TableStatus.Occupied]),
	tableQrCode: z.string(),
	restaurantId: z.string().min(1, {
		message: 'Restaurant ID is required',
	}),
});

export const AddMenuSchemaWithId = AddMenuSchema.extend({
	id: z.string().optional(),
});

export const AddCategorySchema = z.object({
	category: z.string().min(1, {
		message: 'Category is required',
	}),
	restaurantId: z.string().min(1, {
		message: 'Restaurant ID is required',
	}),
});
