import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const parseRedirectTo = (value: FormDataEntryValue | null) => {
	if (typeof value !== 'string') {
		return '/manage';
	}

	return value.startsWith('/') ? value : '/manage';
};

export const load: PageServerLoad = async ({ locals, url }) => {
	const { session } = await locals.safeGetSession();

	if (session) {
		throw redirect(303, '/manage');
	}

	return {
		redirectTo: parseRedirectTo(url.searchParams.get('redirectTo'))
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const redirectTo = parseRedirectTo(formData.get('redirectTo'));

		if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
			return fail(400, {
				error: 'Email and password are required.',
				email: typeof email === 'string' ? email : ''
			});
		}

		const { error } = await locals.supabase.auth.signInWithPassword({ email, password });

		if (error) {
			return fail(400, {
				error: error.message,
				email
			});
		}

		throw redirect(303, redirectTo);
	}
};
