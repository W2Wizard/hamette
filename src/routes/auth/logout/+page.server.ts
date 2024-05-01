// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

// ============================================================================

export const load: PageServerLoad = async () => {
	redirect(302, "/");
};

export const actions: Actions = {
	// Logout the user
	default: async ({ cookies, locals }) => {
		if (!locals.session) {
			return fail(400, { message: "No session" });
		}

		await lucia.invalidateSession(locals.session.id);
		cookies.delete(lucia.sessionCookieName, { path: "/" });
		redirect(302, "/auth/signin");
	}
};
