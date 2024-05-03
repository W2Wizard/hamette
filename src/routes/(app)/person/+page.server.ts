import { ToastForm } from "$lib/utils";
import type { Actions } from "./$types";

export const actions: Actions = {
	default: async (event) => {
		return ToastForm.success("Person added!");
	},
};
