import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import APP_PATHS from '@/config/path.config';

const { auth } = NextAuth(authConfig);

/**
 * Prefix for API authentication routes.
 * These routes are used for API authentication purposes
 * @type {string}
 */
const apiAuthPrefix = '/api/auth';

/**
 * An array of Authentication routes
 * @type {string[]}
 */
const authRoutes = [APP_PATHS.LOGIN, APP_PATHS.REGISTER, APP_PATHS.RESET_PASSWORD, APP_PATHS.NEW_PASSWORD];

/**
 * Public routes accessible to all users.
 * @type {string[]}
 */
const publicRoutes = [APP_PATHS.NEW_VERIFICATION, APP_PATHS.HOME, '/api/stripe/webhook(.*)'];

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !(req.auth == null);

	const isApiRoutePrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiRoutePrefix) return;

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(APP_PATHS.DASHBOARD, nextUrl));
		}
		return;
	}

	if (!isLoggedIn && !isPublicRoutes) {
		return Response.redirect(new URL(APP_PATHS.LOGIN, nextUrl));
	}
});

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
