import { Resend } from "resend";
import { RESEND_EMAIL_SECRET } from "$env/static/private";

export const resend = new Resend(RESEND_EMAIL_SECRET);
