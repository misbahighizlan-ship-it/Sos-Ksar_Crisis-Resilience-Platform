import { auth } from "@/lib/auth";
import { db } from "@/db";
import { urgency, user } from "@/db/schema";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ShieldAlert, AlertTriangle, Activity } from "lucide-react";
import Image from "next/image";
import { eq, desc } from "drizzle-orm";
import UrgencyManagementList from "@/components/UrgencyManagementList";
import { deleteUrgencyAction, updateUrgencyAction } from "@/lib/urgency-actions";

export default async function AdminUrgenciesPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "admin") {
        redirect("/login");
    }

    // Fetch all urgencies with user names
    const allUrgencies = await db.select({
        urgency: urgency,
        userName: user.name
    })
        .from(urgency)
        .leftJoin(user, eq(urgency.userId, user.id))
        .orderBy(desc(urgency.createdAt));

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-20">
            {/* Header */}
            <div className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-6 w-6 text-red-600" />
                        <h1 className="text-xl font-black tracking-tight text-zinc-900">
                            SOS <span className="text-red-600">ADMIN</span>
                        </h1>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="/admin/users" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">Users</a>
                        <a href="/admin/urgencies" className="text-[11px] font-bold uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1">Emergency Fleet</a>
                        <a href="/admin/profile" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">Terminal Profile</a>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 mt-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-1">
                            <h2 className="text-4xl font-black tracking-tight text-zinc-900">System <span className="text-red-600">Response</span></h2>
                            <p className="text-zinc-500 font-medium">Coordinate and manage the emergency fleet reports.</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-white border border-zinc-200 p-4 rounded-3xl shadow-sm flex items-center gap-4 min-w-[160px]">
                                <div className="h-10 w-10 bg-red-50 rounded-2xl flex items-center justify-center text-red-600">
                                    <Activity className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-xl font-black">{allUrgencies.length}</div>
                                    <div className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Total Reports</div>
                                </div>
                            </div>
                            <div className="bg-white border border-zinc-200 p-4 rounded-3xl shadow-sm flex items-center gap-4 min-w-[160px]">
                                <div className="h-10 w-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                                    <AlertTriangle className="h-5 w-5" />
                                </div>
                                <div>
                                    <div className="text-xl font-black">{allUrgencies.filter(u => u.urgency.status !== "resolved").length}</div>
                                    <div className="text-[9px] font-black uppercase text-zinc-400 tracking-wider">Active Tasks</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive List with Dialogs */}
                    <UrgencyManagementList
                        urgencies={allUrgencies as any}
                        onDelete={deleteUrgencyAction}
                        onUpdate={updateUrgencyAction}
                    />
                </div>
            </main>
        </div>
    );
}
