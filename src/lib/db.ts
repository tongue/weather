import type { Weather } from '$lib/types';
import fs from 'fs/promises';

const DB_FILE = 'db.json';

export type DB = {
	weather: Map<string, Weather>;
	__stop: () => void;
};

export const initDatabase = async (): Promise<DB> => {
	let data: Record<string, [string, Weather][]> = {};

	try {
		const file = await fs.readFile(DB_FILE);
		data = JSON.parse(file.toString());
	} catch (error) {
		console.error(`Failed to read ${DB_FILE}`, error);
	}

	const interval = setInterval(async () => {
		try {
			await fs.writeFile(DB_FILE, JSON.stringify({ weather: [...db.weather.entries()] }));
		} catch (error) {
			console.error(`Failed to write ${DB_FILE}`, error);
		}
	});

	const db: DB = {
		weather: new Map<string, Weather>(data.weather),
		__stop: () => clearInterval(interval)
	};

	return db;
};
