import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import RoleNavbarClient from "./RoleNavbarClient";

export async function RoleNavbar() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return <RoleNavbarClient session={session} />;
}
