import type { GETPerson } from '$lib/types';
import { apiFetch } from '$lib/utils';
import type { PageServerLoad } from './$types';

function fetchPerson(get: typeof fetch, id: number) {
	return apiFetch<GETPerson>(`/api/person?id=${id}`, {
		fetch: get
	});
}

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		streamed: {
			one: fetchPerson(fetch, 1),
		}
	}
};
