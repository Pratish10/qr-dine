import { type z } from 'zod';
import {
	type LoginUserSchema,
	type RegisterUserSchema,
	type NewPasswordSchema,
	type ResetSchema,
	type RestaurantSchema,
	type ProfileSchema,
} from './schema';

export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type LoginUserType = z.infer<typeof LoginUserSchema>;
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
export type ResetSchemaType = z.infer<typeof ResetSchema>;
export type RestaurantSchemaType = z.infer<typeof RestaurantSchema>;
export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
