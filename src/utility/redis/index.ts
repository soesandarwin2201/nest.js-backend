import { Redis } from 'ioredis';
import * as dotenv from 'dotenv';
dotenv.config();

export const redisClient = new Redis({
	port:6379,
	host: process.env.REDIS_HOST,
});

export const RedisGetKeys = async (pattern?: string) => {
	try {
		return await redisClient.keys(pattern);
	} catch (error) {
		console.error(`Error getting keys from Redis: ${error}`);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

export const RedisInsert = async (key: string, value: string | number) => {
	try {
		return await redisClient.set(key, value);
	} catch (error) {
		console.error(`Error inserting data into Redis: ${error}`);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

export const RedisGet = async (key: string) => {
	try {
		return await redisClient.get(key);
	} catch (error) {
		console.error(`Error getting data from Redis: ${error}`);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

export const RedisExpire = async (key: string, value: string | number) => {
	try {
		return await redisClient.expire(key, value);
	} catch (error) {
		console.error(`Error setting expiration for key ${key}: ${error}`);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

export const RedisDelete = async (key: string) => {
	try {
		const result = await redisClient.del(`sess:${key}`);
		if (result === 1) {
			console.log(`Deleted session for user ID: ${key}`);
		} else {
			console.log(`Session for user ID: ${key} not found`);
		}
	} catch (error) {
		console.error(`Error deleting session: ${error}`);
	}
};

export const RedisValidate = async (key: string, value: string) => {
	try {
		const storedValue = await redisClient.get(key);
		return storedValue === value;
	} catch (error) {
		console.error(`Error validating data in Redis: ${error}`);
		throw error; // Re-throw the error to propagate it to the caller
	}
};

interface SessionData {
	userId: string;
	email: string;
	social: boolean;
	seller: boolean;
	market: boolean;
	chat: boolean;
}

export const updateUserSession = async (userId: string, email: string, sessionField: any) => {
	const sessionKey = `sess:${userId}`;
	const sessionData = await RedisGet(sessionKey);

	if (!sessionData) {
		// If session doesn't exist, create a new one
		const newSessionData: SessionData = {
			userId,
			email,
			social: false,
			seller: false,
			market: false,
			chat: false,
			...sessionField,
		};
		const expirationSeconds = 90 * 24 * 60 * 60;
		await RedisInsert(sessionKey, JSON.stringify(newSessionData));
		await RedisExpire(sessionKey, expirationSeconds);
	} else {
		// If session exists, modify the existing session data
		const updatedSessionData: SessionData = {
			...JSON.parse(sessionData),
			...sessionField,
		};

		await RedisInsert(sessionKey, JSON.stringify(updatedSessionData));
	}
};
