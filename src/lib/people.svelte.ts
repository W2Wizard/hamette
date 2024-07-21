import type { Entry } from "./types";
import { clientWritable } from "./utils";

export type FamilyStore = Map<number, Entry>;
export const familiyStore = clientWritable<FamilyStore>(new Map());
