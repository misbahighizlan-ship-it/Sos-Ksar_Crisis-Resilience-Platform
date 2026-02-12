import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // For potential interactions

interface Urgency {
    id: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    location: string;
    imageUrl?: string | null;
    status: "pending" | "investigating" | "resolved";
    createdAt: Date;
}

interface CitizenProfileProps {
    user: {
        name: string;
        email: string;
        role: string;
        image?: string | null;
    };
    urgencies: Urgency[];
}

export function CitizenProfile({ user, urgencies }: CitizenProfileProps) {
    return (
        <div className="space-y-6">
            {/* User Info Card */}
            <Card className="bg-white/50 backdrop-blur-sm border-gray-200">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                            <Badge variant="outline" className="mt-2 capitalize">{user.role}</Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* My Urgencies */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">My Reporting History</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {urgencies.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center py-8">You haven't reported any emergencies yet.</p>
                    ) : (
                        urgencies.map((urgency) => (
                            <Card key={urgency.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-base font-semibold truncate" title={urgency.title}>{urgency.title}</CardTitle>
                                        <Badge variant={urgency.severity === "critical" ? "destructive" : urgency.severity === "high" ? "default" : "secondary"} className="capitalize">
                                            {urgency.severity}
                                        </Badge>
                                    </div>
                                    <CardDescription className="text-xs">{new Date(urgency.createdAt).toLocaleDateString()}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {urgency.imageUrl && (
                                        <div className="mb-3 rounded-md overflow-hidden h-40 relative">
                                            <img src={urgency.imageUrl} alt={urgency.title} className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-2">{urgency.description}</p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                        {urgency.location}
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Badge variant="outline" className={`ml-auto capitalize ${urgency.status === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                                        urgency.status === 'investigating' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                            'bg-yellow-50 text-yellow-700 border-yellow-200'
                                        }`}>
                                        {urgency.status}
                                    </Badge>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
