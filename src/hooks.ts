import { DB, initDatabase } from '$lib/db';
import type { Handle } from '@sveltejs/kit';

const setup = initDatabase().catch((error: Error) => {
	console.error(error);
	process.exit(-1);
});

export const handle: Handle = async ({ request, resolve }) => {
	const db: DB = await setup;
	request.locals.db = db;
	const response = await resolve(request);
	return response;
};
