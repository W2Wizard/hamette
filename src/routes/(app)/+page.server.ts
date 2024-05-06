import type { Family } from '$lib/types';
import { apiFetch } from '$lib/utils';
import type { PageServerLoad } from './$types';

//function fetchPerson(get: typeof fetch, id: number) {
//	return apiFetch<GETPerson>(`/api/person?id=${id}`, {
//		fetch: get
//	});
//}

export const load: PageServerLoad = async ({ fetch, depends }) => {
	depends("people");
	const person = apiFetch<Family>(`/api/person?id=1`, { fetch });
	return { person };

	//return {
	//	streamed: {
	//		person: apiFetch<GETPerson>(`/api/person?id=1`, { fetch }),
	//	}
	//}
};
