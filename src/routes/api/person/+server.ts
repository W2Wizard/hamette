import { db } from "$lib/server/auth";
import type { Marriage, Person } from "@prisma/client";
import { json } from "@sveltejs/kit";
import type { GETPerson } from "$lib/types";
import type { RequestHandler } from "./$types";

/*
model Person {
    id         Int      @id @default(autoincrement())
    created_at DateTime @default(now())
    updated_at DateTime @default(now()) @updatedAt

    //== Data ==//

    first_name  String
    middle_name String?
    last_name   String

    born_at DateTime  @default(now())
    died_at DateTime?

    age        Int? // Calculated field
    male       Boolean @default(false)
    picture    String? // Base64 encoded image
    occupation String?
    bio        String?
    birthplace String?

    //== Relations ==//

    // The person has the following marriages
    as_wife    Marriage[] @relation("Wife")
    as_husband Marriage[] @relation("Husband")

    // This person is a result of the following marriage
    marriage_id Int?
    child_of    Marriage? @relation("ChildOfMarriage", fields: [marriage_id], references: [id])

    @@unique([first_name, middle_name, last_name, marriage_id])
    @@map("person")
}

model Marriage {
    id Int @id @default(autoincrement())

    husband_id Int
    husband    Person @relation("Husband", fields: [husband_id], references: [id])

    wife_id Int?
    wife    Person? @relation("Wife", fields: [wife_id], references: [id])

    children Person[] @relation("ChildOfMarriage")

    @@unique([husband_id, wife_id])
    @@map("marriages")
}
*/



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

	return json({ person, spouses } as GETPerson);
};
