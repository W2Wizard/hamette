import type { Marriage, Person } from "@prisma/client";

export interface Family {
	person: Person;
	spouses: {
		marriage: Marriage;
		person: Person | null;
		children: Person[];
	}[];
}
