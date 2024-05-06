import { db } from "$lib/server/auth";
import type { Marriage, Person } from "@prisma/client";
import { json } from "@sveltejs/kit";
import type { Family } from "$lib/types";
import type { RequestHandler } from "./$types";

// GET /api/person/[id]/
// Return a person by id
export const GET: RequestHandler = async (event) => {
	const id = event.url.searchParams.get("id");
	if (!id) return new Response(null, { status: 404 });

	const personQuery = db.query(`SELECT * FROM person WHERE id = ?`);
	const childrenQuery = db.query(`SELECT * FROM person WHERE marriage_id = ?`);
	const marriageQuery = db.query(`SELECT * FROM marriages WHERE husband_id = ? OR wife_id = ?`);

	const person = await personQuery.get(id) as Person | null;
	if (!person) return new Response(null, { status: 404 });

	const marriages = marriageQuery.all(id, id) as Marriage[];
	const spouses = marriages.map(marriage => {
		const spouseId = marriage.husband_id === person.id ? marriage.wife_id : marriage.husband_id;
		const spouse = personQuery.get(spouseId) as Person | null;
		const children = childrenQuery.all(marriage.id) as Person[];

		return { marriage, person: spouse, children };
	});

	return json({ person, spouses } as Family);
};
