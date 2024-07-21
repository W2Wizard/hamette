// ============================================================================
// Nextdemy B.V, Amsterdam 2023, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import { Lucia, generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { BunSQLiteAdapter } from "@lucia-auth/adapter-sqlite";
import { dev } from "$app/environment";
import Database from "bun:sqlite";
import { alphabet, generateRandomString } from "oslo/crypto";

// ============================================================================

/** The length of the reset token. */
export const RESET_TOKEN_LENGTH = 40;
/** The length of the verification code. */
export const VERIFICATION_CODE_LENGTH = 8;
/** The main instance of the database. */
export const db = new Database("./prisma/dev.db");
const adapter = new BunSQLiteAdapter(db, {
	user: "user",
	session: "session",
});

export const sqlPerson = db.query("SELECT * FROM person WHERE id = ?");
export const sqlChildren = db.query("SELECT id FROM person WHERE marriage_id = ?");
export const sqlMarriages = db.query("SELECT * FROM marriages WHERE husband_id = ? OR wife_id = ?");

/** The main instance of Lucia. */
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
			sameSite: "strict",
		},
	},
});

// ============================================================================

/**
 * Creates a password reset token for the user.
 * Deletes any existing token for the user.
 * @param userId
 * @returns
 */
export function createResetToken(userId: string) {
	const tokenId = generateId(RESET_TOKEN_LENGTH);
	const expiresAt = createDate(new TimeSpan(2, "h"));

	db.query("DELETE FROM ResetTokens WHERE user_id = ?").get(userId);
	db.query(
		"INSERT INTO ResetTokens (id, user_id, expires_at) VALUES (?, ?, ?)",
	).get(tokenId, userId, expiresAt.toISOString());

	return tokenId;
}

/**
 * Creates a verification code for the user.
 * @param userId The user's ID.
 * @param email The user's email.
 * @returns The verification code.
 */
export function createVerificationCode(userId: string, email: string) {
	db.query("DELETE FROM VerificationTokens WHERE user_id = ?").get(userId);
	const code = generateRandomString(VERIFICATION_CODE_LENGTH, alphabet("0-9"));
	db.query(
		"INSERT INTO VerificationTokens (user_id, email, code, expires_at) VALUES (?, ?, ?, ?)",
	).get(userId, email, code, createDate(new TimeSpan(5, "m")).toISOString());

	return code;
}

// ============================================================================

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			email: string;
			verified: boolean;
		};
	}
}
