import type { City } from '$lib/types';

type ObjectToQueryParams = (obj: Record<string, string>) => string;
export const objectToQueryParams: ObjectToQueryParams = (obj) =>
	Object.entries(obj)
		.map(([key, value]): string => `${key}=${value}`)
		.join('&');

type GenerateCityId = (name: string, country: string) => string;
export const generateCityId: GenerateCityId = (name, country) =>
	`${name.trim().toUpperCase()}_${country.trim().toUpperCase()}`;

type CityAndCountryFromString = (str: string) => [string, string] | undefined;
export const cityAndCountryFromString: CityAndCountryFromString = (str) => {
	const cityAndCountry = str.split(',');
	return cityAndCountry.length === 2
		? [cityAndCountry[0].trim(), cityAndCountry[1].trim()]
		: undefined;
};

type IsCityCountry = (name: string, country: string) => (city: City) => boolean;
export const isCityCountry: IsCityCountry = (name, country) => (city) =>
	city.name === name && city.country === country;

type NotCityCountry = (name: string, country: string) => (city: City) => boolean;
export const notCityCountry: NotCityCountry = (name, country) => (city) =>
	city.name !== name && city.country !== country;

type Debounce = <Arguments extends unknown[]>(
	fn: (...args: Arguments) => unknown,
	timeout: number
) => (...args: Arguments) => void;
export const debounce: Debounce = (fn, timeout) => {
	let timer: NodeJS.Timeout;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, timeout);
	};
};

type FetchJson = <Result extends Record<string, unknown> | unknown[]>(
	...path: string[]
) => Promise<Result>;
export const fetchJson: FetchJson = async (...path) => {
	const res = await fetch(encodeURI(`/${path.join('/')}.json`));
	return await res.json();
};
