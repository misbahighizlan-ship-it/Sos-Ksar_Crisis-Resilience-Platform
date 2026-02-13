import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ShieldAlert, Users, UserCog, ArrowRight, Search, Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function AdminUsersPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "admin") {
        redirect("/login");
    }

    const allUsers = await db.select().from(user);

    async function updateRole(formData: FormData) {
        "use server";
        const userId = formData.get("userId") as string;
        const newRole = formData.get("role") as "admin" | "volunteer" | "citizen";

        if (!userId || !newRole) return;

        await db.update(user).set({ role: newRole }).where(eq(user.id, userId));
        revalidatePath("/admin/users");
    }

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
                        <a href="/admin/users" className="text-[11px] font-bold uppercase tracking-widest text-red-600 border-b-2 border-red-600 pb-1">Users</a>
                        <a href="/admin/urgencies" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">Emergency Fleet</a>
                        <a href="/admin/profile" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 transition-colors">Terminal Profile</a>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 md:px-6 mt-12">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black tracking-tight text-zinc-900 mb-2">User <span className="text-red-600">Directory</span></h2>
                        <p className="text-zinc-500 font-medium">Manage authorization levels for responders and citizens.</p>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50 border-b border-zinc-200">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Identity</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Communication</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400">Personnel Role</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                    {allUsers.map((u) => (
                                        <tr key={u.id} className="hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center relative overflow-hidden flex-shrink-0">
                                                        {u.image ? (
                                                            /* Fallback added for image loading issues */
                                                            <Image
                                                                src={u.image}
                                                                alt={u.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="48px"
                                                            />
                                                        ) : (
                                                            <Users className="h-6 w-6 text-zinc-400" />
                                                        )}
                                                    </div>
                                                    <div className="font-bold text-zinc-900">{u.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-zinc-500 font-medium whitespace-nowrap">
                                                    <Mail className="h-4 w-4 text-zinc-300" />
                                                    {u.email}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200">
                                                    <div className={`h-1.5 w-1.5 rounded-full ${u.role === "admin" ? "bg-red-500" :
                                                            u.role === "volunteer" ? "bg-orange-500" : "bg-zinc-400"
                                                        }`} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{u.role}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <form action={updateRole} className="inline-flex items-center gap-2">
                                                    <input type="hidden" name="userId" value={u.id} />
                                                    <select
                                                        name="role"
                                                        defaultValue={u.role}
                                                        className="appearance-none bg-white border border-zinc-200 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all cursor-pointer hover:border-zinc-300"
                                                    >
                                                        <option value="citizen">Citizen</option>
                                                        <option value="volunteer">Volunteer</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                    <button
                                                        type="submit"
                                                        className="bg-zinc-900 hover:bg-red-600 text-white p-2.5 rounded-xl transition-all active:scale-95 group"
                                                    >
                                                        <ShieldCheck className="h-4 w-4" />
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
