// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { RESET_TOKEN_LENGTH, createResetToken, db, lucia } from "$lib/server/auth";
import type { ResetTokens, User } from "@prisma/client";
import { resend } from "$lib/email/mail";
import { isWithinExpirationDate } from "oslo";

// ============================================================================

export const load: PageServerLoad = async ({ url }) => {
	const tokenQuery = url.searchParams.get("token");
	if (!url.searchParams.has("token") || !tokenQuery || tokenQuery.length !== RESET_TOKEN_LENGTH)
		return { token: null };

	const token = db.query("SELECT * FROM ResetTokens WHERE id = ?")
		.get(tokenQuery) as ResetTokens | null;
	if (!token || !isWithinExpirationDate(new Date(token.expires_at))) {
		error(400, "Invalid token");
	}
	return { token: tokenQuery };
};

export const actions: Actions = {
	// Send the password reset link
	request: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();
		const message = "If your email exists / is verified, you will receive a password reset link";

		// Wait a random 125 - 250 ms to prevent timing attacks
		await new Promise((resolve) => setTimeout(resolve, 125 + Math.random() * 125));

		if (!email || email.length < 3 || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
			return fail(400, { message });

		const user = db.prepare("SELECT * FROM user WHERE email = ?").get(email) as User | null;
		if (!user || !user.verified) {
			return { message };
		}

		// TODO: Use custom email template
		const token = createResetToken(user.id);
		const link = `http://localhost:5173/auth/forgot?token=${token}`;
		resend.emails.send({
			from: "onboarding@resend.dev",
			to: user.email,
			subject: "Password reset request",
			html: `
			<p>Click the link below to reset your password</p>
			<p>If you didn't request this, you can ignore this email, probably change your password</p>
			<a href="${link}">Reset your password</a>
			`
		});

		return { message };
	},
	// Reset the password
	reset: async ({ request, cookies, url }) => {
		const formData = await request.formData();
		const tokenQuery = formData.get("token")?.toString();
		const password = formData.get("password")?.toString();
		if (!tokenQuery || tokenQuery.length !== RESET_TOKEN_LENGTH) {
			error(400, "Invalid token");
		}
		if (!password || password.length < 8)
			return fail(400, { message: "Invalid password" });

		// Verify the token
		// TODO: Make a it a transaction
		const token = db.query("SELECT * FROM ResetTokens WHERE id = ?")
			.get(tokenQuery) as ResetTokens | null;
		if (token)
			db.query("DELETE FROM ResetTokens WHERE id = ?").get(tokenQuery);
		if (!token || !isWithinExpirationDate(new Date(token.expires_at))) {
			error(400, "Invalid token");
		}

		// TODO: Compare the hashes to see if the password is the same?
		await lucia.invalidateUserSessions(token.user_id);
		const hashedPassword = await Bun.password.hash(password, "argon2id");
		db.query("UPDATE user SET hash = ? WHERE id = ?").get(hashedPassword, token.user_id);

		const session = await lucia.createSession(token.user_id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: "/",
			...sessionCookie.attributes
		});

		redirect(302, "/");
	},
};
