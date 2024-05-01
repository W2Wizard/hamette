// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================
// Modified from sveltekit-rate-limiter by Andreas Söderlund @ciscoheat
// ============================================================================

import TTLCache from '@isaacs/ttlcache';
import type { RequestEvent } from '@sveltejs/kit';

// Constants, types, ...
// ============================================================================

/** A rate limit */
export type Rate = [number, RateUnit];
/** The unit for the rate limit */
export type RateUnit = 's' | 'm' | 'h' | 'd';

interface CacheValue {
	rate: number;
	retryAfter: number;
}

const RateUnitMap: Record<RateUnit, number> = {
	's': 1000,
	'm': 60000,
	'h': 60 * 60000,
	'd': 24 * 60 * 60000
};

// Util Functions
// ============================================================================

// Convert milliseconds to seconds
function toSeconds(ms: number) {
	return Math.round(ms / 1000);
}

// Convert a rate unit to seconds
function unitToSeconds(unit: RateUnit) {
	return toSeconds(RateUnitMap[unit]);
}

// Hashing function used to create a unqiue hash per agent
function hashFunc(str: string) {
	if (typeof Bun !== 'undefined') {
		return Bun.sha(str, "base64");
	} else {
		let hash = '';
		crypto.subtle.digest('SHA-256', new TextEncoder().encode(str)).then((buffer) => {
			hash = [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('');
		});
		return hash;
	}
}

// Main Function
// ============================================================================

/**
 * Create a new rate limiter that uses a TTL cache to store the rate limits
 * This is a modified version of sveltekit-rate-limiter but without the bloat
 * and 20000 features that are not needed.
 *
 * @param maxItems The maximum number of items to store in the cache
 * @returns The rate limiter
 */
export function useRetryAfter(options = {
	/** IP e.g: CLI, cURL, etc */
	IP: [15, 'h'] as Rate,
	/** IP + User-Agent e.g: Firefox, Chrome, etc */
	IPUA: [5, 'm'] as Rate
}) {

	const maxTTL = Math.max(RateUnitMap[options.IP[1]], RateUnitMap[options.IPUA[1]]);
	const cache = new RateLimiter(maxTTL, Infinity);

	async function isLimited(event: RequestEvent) {
		const ip = event.getClientAddress();
		const ua = event.request.headers.get('user-agent');
		const hash = ua ? hashFunc(ip + ua) : hashFunc(ip);
		const targetRate = ua ? options.IPUA : options.IP;
		const cached = await cache.add(hash, targetRate[1]);

		if (cached.rate > targetRate[0])
			return { limited: true, hash, unit: targetRate[1] };

		return {
			hash: null,
			limited: false,
			unit: targetRate[1]
		};
	}

	/**
	 * Check if the request is limited and return the retryAfter time
	 * @param event The request event
	 * @returns The limited status and the retryAfter time
	 */
	async function check(event: RequestEvent) {
		const { hash, unit, limited } = await isLimited(event);
		if (!limited) return { isLimited: false , retryAfter: 0 };

		// Was not limited before, buit is now
		if (!hash) return { isLimited: true, retryAfter: unitToSeconds(unit) };
		// Has been limited now
		const cached = await cache.add(hash, unit);
		return {
			isLimited: true,
			retryAfter: toSeconds(cached.retryAfter - Date.now())
		};
	}

	return {
		get cache() { return cache; },
		check,
	};
}

// RateLimiter Class
// ============================================================================

class RateLimiter {
	private cache: TTLCache<string, CacheValue>;

	constructor(maxTTL: number, maxItems = Infinity) {
		this.cache = new TTLCache({
			ttl: maxTTL,
			max: maxItems,
			noUpdateTTL: true
		});
	}

	async clear() {
		return this.cache.clear();
	}

	async add(hash: string, unit: RateUnit) {
		if (this.cache.has(hash)) {
			let cacheValue = this.cache.get(hash)!;
			cacheValue.rate += 1;
			return cacheValue;
		}

		const ttl = RateUnitMap[unit] ?? RateUnitMap['m'];
		const retryAfter = Date.now() + ttl;
		const cacheValue: CacheValue = {
			rate: 1,
			retryAfter
		};

		this.cache.set(hash, cacheValue, { ttl });
		return cacheValue;
	}
}