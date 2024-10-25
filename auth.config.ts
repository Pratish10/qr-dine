/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

import type { NextAuthConfig, User } from 'next-auth';
import { LoginUserSchema } from './schemas/schema';
import { getUserByEmail } from './lib/auth/user';

export default {
	providers: [
		Github({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginUserSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);

					if (!user?.encryptedPassword) return null;

					const passwordMatch = await bcryptjs.compare(password, user.encryptedPassword);

					if (passwordMatch) {
						return user as unknown as User;
					}
				}
				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
