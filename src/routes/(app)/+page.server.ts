import type { Entry } from '$lib/types';
import { ToastForm, apiFetch } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, depends }) => {
	depends("people");

	const entry = apiFetch<Entry>(`/api/person/1`, { fetch });

	return {
		entry
	};
};

export const actions: Actions = {
	//default: async ({ url  }) => {
	//	return ToastForm.success(`Loaded : ${url.searchParams.get("person")}`);
	//},
	"person": async ({ url }) => {
		return ToastForm.success(`Loaded : ${url.searchParams.get("person")}`);
	},
	"relationship": async ({ url }) => {
		return ToastForm.success(`Loaded : ${url.searchParams.get("relationship")}`);
	}
};
