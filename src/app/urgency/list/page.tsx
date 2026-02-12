import { getUrgencies } from "@/app/actions/urgency";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { auth } from "@/lib/auth"; // We might need session to determine if "My" or "All"
import { headers } from "next/headers";

export default async function UrgencyListPage() {
    // Determine user role for title
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const urgencies = await getUrgencies();
    const isCitizen = session?.user?.role === 'citizen';

    return (
        <div className="container mx-auto py-10 pt-20">
            <h1 className="text-3xl font-bold mb-6">
                {isCitizen ? "My Urgencies" : "All Urgencies"}
            </h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {urgencies.length === 0 ? (
                    <p className="text-muted-foreground">No urgencies found.</p>
                ) : (
                    urgencies.map((urgency) => (
                        <Card key={urgency.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg">{urgency.title}</CardTitle>
                                    <Badge variant={urgency.severity === "critical" ? "destructive" : "default"}>
                                        {urgency.severity}
                                    </Badge>
                                </div>
                                <CardDescription>{new Date(urgency.createdAt).toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-2">{urgency.description}</p>
                                <p className="text-sm text-muted-foreground">Location: {urgency.location}</p>
                            </CardContent>
                            <CardFooter>
                                <Badge variant="outline">{urgency.status}</Badge>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
