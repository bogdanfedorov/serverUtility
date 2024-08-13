import { Day } from "../time/index.js";

export const DefaultHeader = {
  alg: "HS256",
  typ: "JWT",
};

export const BasePayload = {
  iss: "next_crm_server",
  exp: Day,
};

if (!process.env.AUTH_SIGNATURE_SECRET) {
  throw new Error("AUTH_SIGNATURE_SECRET is required on .env file");
}
export const SignatureSecret = process.env.AUTH_SIGNATURE_SECRET;
