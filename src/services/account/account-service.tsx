import { api } from "@/lib/requests";
import { SessionDataSchema } from "./account-schemas";

export async function authenticate(body: { email: string; password: string }) {
  return api
    .post("Account/authenticate", {
      json: body,
    })
    .json()
    .then((val) => SessionDataSchema.parseAsync(val));
}

export async function refreshToken(token: string) {
  return api
    .post("Account/refresh-token", {
      json: { token },
    })
    .json()
    .then((val) => SessionDataSchema.parseAsync(val));
}
