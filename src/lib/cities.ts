import { writable } from 'svelte/store';
import type { City } from '$lib/types';
import { browser } from '$app/env';
import { notCity } from './utils';

const createCities = () => {
	const c = browser ? JSON.parse(localStorage.getItem('cities') || '[]') : [];
	const { subscribe, update } = writable<City[]>(c);

	return {
		subscribe,
		add: (name: string, country: string) => update((cities) => [...cities, { name, country }]),
		remove: (name: string, country: string) =>
			update((cities) => cities.filter(notCity(name, country)))
	};
};

export const cities = createCities();

cities.subscribe((value) => {
	if (browser) localStorage.cities = JSON.stringify(value);
});
