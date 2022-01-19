import { fetchJson } from '$lib/utils';
import { derived, writable } from 'svelte/store';
import { cities } from '$lib/cities';
import type { City, CityAndWeather, Weather } from '$lib/types';

const defaultValue: [City, Weather][] = [];

export const weather = derived(
	cities,
	($cities, set) => {
		Promise.all(
			$cities.map<Promise<CityAndWeather>>(async (city) => [
				city,
				await fetchJson<Weather>('weather', city.country, city.name)
			])
		).then((data) => set(data));

		return () => {
			set = () => ({});
		};
	},
	defaultValue
);

const sortingFunctions: Record<Sort, (a: CityAndWeather, b: CityAndWeather) => number> = {
	asc: ([, a], [, b]) => +(a.temperature > b.temperature) || -(a.temperature < b.temperature),
	desc: ([, a], [, b]) => +(a.temperature < b.temperature) || -(a.temperature > b.temperature)
};

export type Sort = 'asc' | 'desc';
export type SortingMethod = { method: Sort; label: string };
export const sortingMethods: SortingMethod[] = [
	{
		method: 'asc',
		label: 'Stigande'
	},
	{
		method: 'desc',
		label: 'Fallande'
	}
];
export const sort = writable<SortingMethod>(sortingMethods[0]);

export const sortedWeather = derived(
	[weather, sort],
	([$weather, $sort], set) => {
		set($weather.sort(sortingFunctions[$sort.method]));
	},
	defaultValue
);
