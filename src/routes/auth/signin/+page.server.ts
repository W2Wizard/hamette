// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { db, lucia } from "$lib/server/auth";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import type { User } from "@prisma/client";
import { useRetryAfter } from "$lib/limiter.svelte";

// ============================================================================

const limiter = useRetryAfter({
	IP: [10, "h"],
	IPUA: [5, "m"]
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) return redirect(302, "/");
};

export const actions: Actions = {
	default: async (event) => {
		const check = await limiter.check(event);
		if (check.isLimited)
			return fail(429, { message: `Ratelimited. Try again in ${check.retryAfter} seconds` });

		const { request, cookies } = event;
		const formData = await request.formData();
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		// Wait a random 125 - 250 ms to prevent timing attacks
		await new Promise((resolve) => setTimeout(resolve, 125 + Math.random() * 125));

		if (!email || email.length < 3 || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (!password || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		// NOTE: Returning immediately allows malicious actors to figure out valid usernames from response times
		// By always returning the same response time, we can make it harder to figure out valid usernames but this
		// is not a trivial task.
		const user = db.query("SELECT * FROM user WHERE email = ?").get(email) as User | null;
		if (!user) {
			return fail(400, {
				message: "Invalid email or password"
			});
		}

		const validPassword = await Bun.password.verify(password, user.hash, "argon2id");
		if (!validPassword) {
			return fail(400, {
				message: "Invalid email or password"
			});
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: "/",
			...sessionCookie.attributes
		});

		// Send email notification to user about new session
		redirect(302, "/");
	}
};
