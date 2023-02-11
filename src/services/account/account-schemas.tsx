import { z } from "zod";

export const UserRoleSchema = z.enum(["Student", "Company"]);

export type UserRole = z.infer<typeof UserRoleSchema>;

export const SessionDataSchema = z.object({
  accountId: z.string(),
  role: UserRoleSchema,
  jwtToken: z.string(),
  jwtTokenExpires: z.string(),
  refreshToken: z.string(),
  refreshTokenExpires: z.string(),
});

export type SessionData = z.infer<typeof SessionDataSchema>;
