import { json } from "@sveltejs/kit";
import { db } from "$lib/server/auth.js";
import type { RequestHandler } from "./$types";
import type { Person } from "@prisma/client";

// http://localhost:3000/api/family
// -> Return LATEST family!
// http://localhost:3000/api/family/1
// -> Return family with ID 1!
// http://localhost:3000/api/family/1?ancestors=2
export const GET: RequestHandler = async (event) => {
	//const query = db.query(`SELECT * FROM Family WHERE id = ?`);
	//const family = await query.all(event.params.id) as Family[];

	//const people = db.prepare("SELECT * FROM Person").all() as Person[];

	//// https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
	//event.setHeaders({
	//	"Cache-Control": "max-age=60",
	//});

	//return json(people);
};
