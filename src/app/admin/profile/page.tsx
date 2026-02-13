import { auth } from "@/lib/auth";
import { db } from "@/db";
import { urgency } from "@/db/schema";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ShieldAlert, User, Mail, Shield, ShieldCheck, Activity } from "lucide-react";
import Image from "next/image";
import { eq, desc } from "drizzle-orm";
import UrgencyManagementList from "@/components/UrgencyManagementList";
import { deleteUrgencyAction, updateUrgencyAction } from "@/lib/urgency-actions";

export default async function AdminProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "admin") {
        redirect("/login");
    }

    const adminUser = session.user;

    // Fetch urgencies created by this admin
    const myUrgencies = await db.select()
        .from(urgency)
        .where(eq(urgency.userId, adminUser.id))
        .orderBy(desc(urgency.createdAt));

    const urgenciesWithUser = myUrgencies.map(u => ({
        urgency: u,
        userName: adminUser.name
    }));

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
                        <a href="/admin/urgencies" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">Emergency Fleet</a>
                        <a href="/admin/profile" className="text-[11px] font-bold uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1">Terminal Profile</a>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 mt-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Profile Card */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                                    <Shield className="h-32 w-32" />
                                </div>

                                <div className="relative flex flex-col items-center">
                                    <div className="h-28 w-28 rounded-3xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-6 relative overflow-hidden shadow-sm">
                                        {adminUser.image ? (
                                            <Image
                                                src={adminUser.image}
                                                alt={adminUser.name}
                                                fill
                                                className="object-cover"
                                                sizes="112px"
                                            />
                                        ) : (
                                            <User className="h-10 w-10 text-zinc-300" />
                                        )}
                                        <div className="absolute -bottom-1 -right-1 bg-red-600 p-1.5 rounded-xl border-4 border-white">
                                            <ShieldCheck className="h-3 w-3 text-white" />
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black mb-1 tracking-tight text-zinc-900">{adminUser.name}</h2>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-8 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                                        Command Unit
                                    </div>

                                    <div className="w-full space-y-3 pt-6 border-t border-zinc-100">
                                        <div className="flex items-center gap-3 text-zinc-500 font-medium">
                                            <Mail className="h-4 w-4 text-zinc-300" />
                                            <div className="text-xs truncate">{adminUser.email}</div>
                                        </div>
                                        <div className="flex items-center gap-3 text-zinc-500 font-medium">
                                            <Shield className="h-4 w-4 text-zinc-300" />
                                            <div className="text-xs uppercase tracking-widest font-black">Auth Level 10</div>
                                        </div>
                                    </div>

                                    <button className="w-full mt-10 bg-zinc-900 hover:bg-red-600 text-white font-black py-4 rounded-2xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-zinc-200">
                                        Synchronize Data
                                        <Activity className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Personal Urgencies List */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="mb-2">
                                <h3 className="text-xl font-black tracking-tight text-zinc-900 border-l-4 border-red-600 pl-4 uppercase">
                                    Personal Fleet Registry <span className="text-zinc-400 ml-2 font-bold">({myUrgencies.length})</span>
                                </h3>
                            </div>

                            {myUrgencies.length === 0 ? (
                                <div className="bg-white border-2 border-dashed border-zinc-200 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-zinc-400">
                                    <Activity className="h-12 w-12 mb-4 opacity-20" />
                                    <p className="font-bold uppercase tracking-widest text-[10px]">No active field reports detected.</p>
                                </div>
                            ) : (
                                <UrgencyManagementList
                                    urgencies={urgenciesWithUser as any}
                                    onDelete={deleteUrgencyAction}
                                    onUpdate={updateUrgencyAction}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
