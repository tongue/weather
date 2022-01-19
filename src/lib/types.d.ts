export type GeoCityResponse = {
	id: number;
	wikiDataId: string;
	type: string;
	city: string;
	name: string;
	country: string;
	countryCode: string;
	region: string;
	regionCode: string;
	latitude: number;
	longitude: number;
	population: number;
};

export type WeatherStackResponse = {
	request: {
		type: string;
		query: string;
		language: string;
		unit: string;
	};
	location: {
		name: string;
		country: string;
		region: string;
		lat: string;
		lon: string;
		timezone_id: string;
		localtime: string;
		localtime_epoch: number;
		utc_offset: string;
	};
	current: {
		observation_time: string;
		temperature: number;
		weather_code: number;
		weather_icons: string[];
		weather_descriptions: string[];
		wind_speed: number;
		wind_degree: number;
		wind_dir: string;
		pressure: number;
		precip: number;
		humidity: number;
		cloudcover: number;
		feelslike: number;
		uv_index: number;
		visibility: number;
	};
};

export type City = {
	name: string;
	country: string;
};

export type WeatherTag = 'sun' | 'cloud' | 'rain' | 'snow';

export type Weather = {
	temperature: number;
	tags: WeatherTag[];
};

export type CityAndWeather = [City, Weather];
