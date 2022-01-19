import type { RequestHandler } from '@sveltejs/kit';
import type { Weather, WeatherStackResponse, WeatherTag } from '$lib/types';
import { generateCityId } from '$lib/utils';
import type { DB } from '$lib/db';

const KEY = import.meta.env.VITE_WEATHERSTACK_KEY || '';
if (KEY === '') {
	console.error('Could not get VITE_WEATHERSTACK_KEY from environment variables');
}

const sunWeatherCodes: number[] = [113, 116];
const cloudWeatherCodes: number[] = [116, 119, 122, 143, 182, 200, 248, 260];
const rainWeatherCodes: number[] = [
	176, 263, 266, 281, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359, 386, 389
];
const snowWeatherCodes: number[] = [
	179, 227, 230, 317, 320, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377, 392, 395
];

/** Map of number and WeatherTag */
const weatherCodeTagMap: [number[], WeatherTag][] = [
	[snowWeatherCodes, 'snow'],
	[cloudWeatherCodes, 'cloud'],
	[rainWeatherCodes, 'rain'],
	[sunWeatherCodes, 'sun']
];

/** Get the tags associated with the provided weatherCode */
const weatherCodeToTag = (weatherCode: number): WeatherTag[] =>
	weatherCodeTagMap.reduce<WeatherTag[]>(
		(previousTags, [currentWeatherCodes, currentTag]) =>
			currentWeatherCodes.includes(weatherCode) ? [...previousTags, currentTag] : previousTags,
		[]
	);

export const weatherStackToWeather = (weather: WeatherStackResponse): Weather => ({
	temperature: weather.current.temperature,
	tags: weatherCodeToTag(weather.current.weather_code)
});

export const get: RequestHandler<{ db: DB }, FormData, Weather> = async (request) => {
	const { city, country } = request.params;

	if (typeof city === 'string') {
		const id = generateCityId(city, country);
		const { db } = request.locals;

		const existingWeather = db.weather.get(id);

		if (existingWeather) {
			return {
				status: 200,
				body: existingWeather
			};
		}

		const res = await fetch(
			`http://api.weatherstack.com/current?access_key=${KEY}&query=${encodeURI(
				`${city}, ${country}`
			)}`,
			{ method: 'GET' }
		);
		const data: WeatherStackResponse = await res.json();
		const body = weatherStackToWeather(data);

		db.weather.set(generateCityId(city, country), body);

		return {
			status: res.status,
			body
		};
	} else {
		return {
			status: 400
		};
	}
};
