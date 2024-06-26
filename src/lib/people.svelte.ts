import type { Family } from "./types";
import { clientWritable } from "./utils";

export const familiyStore = clientWritable<Family[]>([]);
export const focusedFamilyStore = clientWritable<Family | null>(null);
