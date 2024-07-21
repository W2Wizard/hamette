import { sqlChildren, sqlMarriages, sqlPerson } from "$lib/server/auth";
import type { Marriage, Person } from "@prisma/client";
import type { RequestHandler } from "./$types";
import type { Entry, Relation } from "$lib/types";
import { json } from "@sveltejs/kit";

// ============================================================================

/** Get a person of a specific ID */
export const GET: RequestHandler = async ({ params }) => {
	const person = sqlPerson.get(Number(params.id)) as Person | null;
	if (!person) return new Response(null, {status: 404});

	// From this person we want to fetch their marriages and children
	const relationShips = sqlMarriages.all(person.id, person.id) as Marriage[];
	const marriages: Relation[] = await Promise.all(relationShips.map(async marriage => {
		const children = sqlChildren.all(marriage.id) as { id: number }[];
		return { marriage, children: children.map(child => child.id)};
	}));

	return json({ person, marriages } as Entry);
};
