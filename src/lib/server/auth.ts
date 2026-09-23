import { json, type RequestEvent } from '@sveltejs/kit';

export const requireAuth = async (event: RequestEvent) => {
	const { session } = await event.locals.safeGetSession();

	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	return null;
};
