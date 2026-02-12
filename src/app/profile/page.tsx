import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUrgencies } from "@/app/actions/urgency";
import { CitizenProfile } from "@/components/User/Profile/CitizenProfile";
import { VolunteerProfile } from "@/components/Volunteer/Profile/VolunteerProfile";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/login");
    }

    // Fetch urgencies based on role (getUrgencies handles logic internally)
    const urgencies = await getUrgencies();

    // Map DB urgencies to Component props (ensure types match or cast)
    // Assuming schema matches interface for now.
    // getUrgencies returns array of { id, title, description, severity, location, status, createdAt, ... }
    // We need to cast severity/status strings to specific unions if TS complains, or update component types to string.

    // Safety cast for this example, or ensure Schema definitions match strictly
    const safeUrgencies = urgencies.map(u => ({
        ...u,
        severity: u.severity as "low" | "medium" | "high" | "critical",
        status: u.status as "pending" | "investigating" | "resolved",
        createdAt: u.createdAt
    }));

    const user = {
        name: session.user.name,
        email: session.user.email,
        role: session.user.role || 'citizen',
        image: session.user.image
    };

    return (
        <div className="container mx-auto py-10 pt-24 px-4 min-h-screen bg-gray-50/50">
            {session.user.role === 'volunteer' || session.user.role === 'admin' ? (
                <VolunteerProfile user={user} urgencies={safeUrgencies} />
            ) : (
                <CitizenProfile user={user} urgencies={safeUrgencies} />
            )}
        </div>
    );
}
