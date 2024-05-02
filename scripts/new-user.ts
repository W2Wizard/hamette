// ============================================================================
// W2Wizard, Amsterdam 2024, All Rights Reserved.
// See README in the root project for more information.
// ============================================================================

import Database from "bun:sqlite";
import { generateId } from "lucia";
import { User } from "@prisma/client";

// ============================================================================

const db = new Database(Bun.env.DATABASE_PATH);
const email = Bun.argv[2];
const password = Bun.argv[3];

// ============================================================================

if (!email || !password) {
	throw new Error("Usage: bun --bun run new-user '<email>' '<password>'");
}

if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
	throw new Error("Invalid email address");
}

if (password.length < 6 || password.length > 255) {
	throw new Error("Password must be between 6 and 255 characters");
}

const user = db
	.prepare("SELECT * FROM user WHERE email = ?")
	.get(email) as User | null;
if (user) throw new Error("User already exists");

try {
	const userId = generateId(15);
	const hashedPassword = await Bun.password.hash(password, "argon2id");
	db.prepare("INSERT INTO user (id, email, hash) VALUES (?, ?, ?)", [
		userId,
		email,
		hashedPassword,
	]).run();
} catch (error) {
	console.error(error);
	process.exit(1);
}
