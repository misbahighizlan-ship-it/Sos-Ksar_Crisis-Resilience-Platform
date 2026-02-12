import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface VolunteerProfileProps {
    user: {
        name: string;
        email: string;
        role: string;
        image?: string | null;
    };
    urgencies: Urgency[];
}

export function VolunteerProfile({ user, urgencies }: VolunteerProfileProps) {
    return (
        <div className="space-y-6">
            {/* User Info Card */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <CardTitle className="text-2xl">Volunteer Dashboard</CardTitle>
                            <CardDescription className="text-gray-600">Welcome back, {user.name}. Ready to help?</CardDescription>
                            <Badge className="mt-2 text-xs" variant="default">Verified Volunteer</Badge>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Stats Overview (Optional, derived from urgencies) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-white">
                    <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-gray-500">Total Reports</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{urgencies.length}</div></CardContent>
                </Card>
                <Card className="bg-white">
                    <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-gray-500">Critical Issues</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-red-600">{urgencies.filter(u => u.severity === 'critical').length}</div></CardContent>
                </Card>
                <Card className="bg-white">
                    <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-yellow-600">{urgencies.filter(u => u.status === 'pending').length}</div></CardContent>
                </Card>
                <Card className="bg-white">
                    <CardHeader className="py-4"><CardTitle className="text-sm font-medium text-gray-500">Resolved</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-green-600">{urgencies.filter(u => u.status === 'resolved').length}</div></CardContent>
                </Card>
            </div>

            {/* All Urgencies Feed */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">Active Emergencies Channel</h2>
                <div className="space-y-4">
                    {/* List view for Volunteers might be better for density */}
                    {urgencies.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No active emergencies reported.</p>
                    ) : (
                        urgencies.map((urgency) => (
                            <Card key={urgency.id} className="hover:bg-gray-50 transition-colors border-l-4 border-l-primary/50">
                                <div className="flex flex-col md:flex-row p-4 gap-4">
                                    {urgency.imageUrl && (
                                        <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
                                            <img src={urgency.imageUrl} alt={urgency.title} className="object-cover w-full h-full" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">{urgency.title}</h3>
                                            <Badge variant={urgency.severity === "critical" ? "destructive" : urgency.severity === "high" ? "default" : "outline"} className="capitalize">
                                                {urgency.severity}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{urgency.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                </svg>
                                                {urgency.location}
                                            </span>
                                            <span>Posted: {new Date(urgency.createdAt).toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-row md:flex-col justify-between items-end gap-2 md:w-32">
                                        <Badge variant="outline" className={`capitalize w-full justify-center ${urgency.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                            urgency.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {urgency.status}
                                        </Badge>
                                        <Button size="sm" variant="outline" className="w-full">View Details</Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
