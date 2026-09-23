import { redirect, type RequestHandler } from '@sveltejs/kit';

const parseRedirectTo = (value: string | null) => {
	if (!value) {
		return '/login';
	}

	return value.startsWith('/') ? value : '/login';
};

export const POST: RequestHandler = async ({ locals, url }) => {
	await locals.supabase.auth.signOut();

	throw redirect(303, parseRedirectTo(url.searchParams.get('redirectTo')));
};
