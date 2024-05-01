// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { db, lucia } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateId } from "lucia";
import type { User } from "@prisma/client";
import type { Actions, PageServerLoad } from "./$types";
import { resend } from "$lib/email/mail";

// ============================================================================

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) return redirect(302, "/");
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			return fail(400, {
				message: "Invalid email"
			});
		}
		if (!password || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

		// Check if user already exists
		console.log(db.filename);
		const user = db
			.prepare("SELECT * FROM user WHERE email = ?")
			.get(email) as User | null;
		if (user) {
			return fail(400, {
				message: "User with such email already exists"
			});
		}

		const userId = generateId(15);
		const hashedPassword = await Bun.password.hash(password, "argon2id");
		db.prepare("INSERT INTO user (id, email, hash) VALUES (?, ?, ?)", [
			userId,
			email,
			hashedPassword
		]).run();

		const session = await lucia.createSession(userId, {});
		const cookie = lucia.createSessionCookie(session.id);
		cookies.set(cookie.name, cookie.value, {
			...cookie.attributes,
			path: "/"
		});

		resend.emails.send({
			from: "onboarding@resend.dev",
			to: "main@w2wizard.dev",
			subject: "Testing Resend",
			html: "<p>Congrats on sending your <strong>first email</strong>!</p>"
		});

		redirect(302, "/auth/signin");
	}
};
