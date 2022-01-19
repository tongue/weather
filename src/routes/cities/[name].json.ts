import type { RequestHandler } from '@sveltejs/kit';
import type { City, GeoCityResponse } from '$lib/types';
import { objectToQueryParams } from '$lib/utils';

export const isTypeCity = ({ type }: GeoCityResponse): boolean => type === 'CITY';

export const geoCityToCity = ({ name, country }: GeoCityResponse): City => ({
	name,
	country
});

const KEY = import.meta.env.VITE_RAPID_API_KEY || '';
const HOST = import.meta.env.VITE_RAPID_API_HOST || '';

if (KEY === '') {
	console.error('Could not get VITE_RAPID_API_KEY from environment variables');
}
if (HOST === '') {
	console.error('Could not get VITE_RAPID_API_HOST from environment variables');
}

export const get: RequestHandler<Record<string, unknown>, FormData, City[]> = async (request) => {
	const { name } = request.params;

	if (!name.length) return { status: 400 };

	const params = {
		limit: '5',
		minPopulation: '250000',
		namePrefix: name
	};
	
	const res = await fetch(
		`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?${objectToQueryParams(params)}`,
		{
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'x-rapidapi-host': HOST,
				'x-rapidapi-key': KEY
			}
		}
	);

	const { data } = await res.json();
	const body = data.filter(isTypeCity).map(geoCityToCity);

	return {
		status: res.status,
		body
	};
};
