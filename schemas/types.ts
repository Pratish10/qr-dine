import { type z } from 'zod';
import {
	type LoginUserSchema,
	type RegisterUserSchema,
	type NewPasswordSchema,
	type ResetSchema,
	type RestaurantSchema,
	type ProfileSchema,
	type AddMenuSchema,
	type AddTableSchema,
} from './schema';

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
export type ResetSchemaType = z.infer<typeof ResetSchema>;
export type RestaurantSchemaType = z.infer<typeof RestaurantSchema>;
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
export type AddMenuSchemaType = z.infer<typeof AddMenuSchema>;
export type AddTableSchemaType = z.infer<typeof AddTableSchema>;
