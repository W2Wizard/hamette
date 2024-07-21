import type { Marriage, Person } from "@prisma/client";

export interface Relation {
	marriage: Marriage;
	children: number[];
}

export interface Entry {
	person: Person;
	marriages: Relation[];
}
