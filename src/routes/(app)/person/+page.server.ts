import { db } from "$lib/server/auth";
import { ToastForm } from "$lib/utils";
import type { Actions } from "./$types";
import { DateTime } from "luxon";

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
*/
const NAME_REGEX = /^[a-zA-Z\s]+$/;

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const file = formData.get("picture") as File | null;
		const firstName = formData.get("first-name")?.toString();
		const lastName = formData.get("last-name")?.toString();
		const middleName = formData.get("middle-name")?.toString();
		const gender = formData.get("gender")?.toString();
		const bornOn = formData.get("birth-date")?.toString();
		const birthPlace = formData.get("birth-place")?.toString();
		const diedOn = formData.get("death-date")?.toString();
		const occupation = formData.get("occupation")?.toString();
		const biography = formData.get("biography")?.toString();

		if (!firstName || !lastName || !gender || !bornOn) {
			return ToastForm.fail(400, "Please fill in the required fields.");
		}

		if (
			!NAME_REGEX.test(firstName) ||
			!NAME_REGEX.test(lastName) ||
			(middleName && !NAME_REGEX.test(middleName))
		) {
			return ToastForm.fail(400, "Invalid name.");
		}

		// Check birth and death date
		const birthDate = DateTime.fromISO(bornOn);
		if (!birthDate.isValid) {
			return ToastForm.fail(400, "Invalid birth date.");
		}

		const deathDate = diedOn ? DateTime.fromISO(diedOn) : null;
		if (
			deathDate &&
			(!deathDate.isValid || deathDate.diff(birthDate).milliseconds < 0)
		) {
			return ToastForm.fail(400, "Invalid death date.");
		}

		const age = Math.floor(
			deathDate
				? deathDate.diff(birthDate, "years").get("years")
				: DateTime.now().diff(birthDate, "years").get("years"),
		);

		const male = gender === "male";
		const query = db.query(`
			INSERT INTO person (
				first_name,
				last_name,
				middle_name,
				born_at,
				died_at,
				age,
				male,
				birthplace,
				occupation,
				bio
			) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
			RETURNING *;
		`);

		return ToastForm.success(age.toString());
	},
};
