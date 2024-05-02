// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { browser } from "$app/environment";
import { fail as kitFail } from "@sveltejs/kit";
import { writable, type Updater } from "svelte/store";
import { getContext, setContext } from "svelte";

// ============================================================================

export const isBrowser = typeof document !== "undefined";

/**
 * A custom store that only allows updating the value from the
 * browser to avoid SSR data leaks.
 * @param initialValue The initial value of the store
 * @returns A writable store
 */
export function clientWritable<T>(initialValue: T) {
	const store = writable(initialValue);

	function set(value: T) {
		if (browser) {
			store.set(value);
		}
	}

	function update(updater: Updater<T>) {
		if (browser) {
			store.update(updater);
		}
	}

	return {
		subscribe: store.subscribe,
		set,
		update,
	};
}

/**
 * Client side context store, the value won't be available on the server
 * nor will it be reactive.
 * @param key The key of the context
 * @returns Functions to get and set the context
 */
export function useContext<T>(key: any) {
	return {
		get: () => getContext<T>(key),
		set: (value: T) => setContext(key, value),
	};
}

export async function useFileReader(file: File) {
	const reader = new FileReader();

	return new Promise<string>((resolve, reject) => {
		reader.addEventListener("error", () => reject(reader.error));
		reader.addEventListener("load", () => resolve(reader.result as string));
		reader.readAsDataURL(file);
	});
}

export async function apiFetch<T = unknown>(route: string, init?: RequestInit) {
	const response = await fetch(route, {
		signal: AbortSignal.timeout(1000),
		...init,
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return (await response.json()) as T;
}

/**
 * Wrapper functions for handling universal toasts by awaited forms.
 *
 * @see AwaitForm for more information.
 */
export namespace ToastForm {
	/**
	 * Universal way to just simply return a failure with a message.
	 * @param status The status code of the failure
	 * @param message The message of the failure
	 * @returns
	 */
	export function fail<T>(
		status: number,
		message: string,
		rest: T = undefined as T,
	) {
		return kitFail(status, { message, ...rest });
	}

	/**
	 * Universal way to just simply return a success with a message.
	 * @param message The message of the success
	 * @param rest Any other data to return
	 * @returns
	 */
	export function success<T>(message: string, rest: T = undefined as T) {
		return { message, ...rest };
	}
}
