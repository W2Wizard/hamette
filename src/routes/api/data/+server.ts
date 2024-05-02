import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/server/auth.js";
import type { Person } from "@prisma/client";

export interface POST {
	firstName: string;
	lastName: string;
	middleName: string | null;
}

export const GET: RequestHandler = async (event) => {
	const people = db.prepare("SELECT * FROM Person").all() as Person[];

	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
	event.setHeaders({
		"Cache-Control": "max-age=60",
	});

	return json(people);
};

export const POST: RequestHandler = async (event) => {
	//let usr: Person = {

	//}


	return new Response();
};
