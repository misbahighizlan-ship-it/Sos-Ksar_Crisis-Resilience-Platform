import { createAuthClient } from "better-auth/react";
import { auth } from "./auth"; // Import server auth config for type inference

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
