"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, User, ShieldCheck, Chrome, ArrowRight, ShieldAlert, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

function RegisterContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<"citizen" | "volunteer" | "admin">("citizen");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackURL = searchParams.get("callbackURL") || "/";

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await authClient.signUp.email({
            email,
            password,
            name,
            role,
            callbackURL,
        });

        if (error) {
            setError(error.message || "Something went wrong");
            setLoading(false);
        } else {
            router.push(callbackURL);
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-sans py-12">
            {/* Background Image matching Homepage */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-zinc-950 z-10" />
                <Image
                    src="/large-tsunami-wave-crashing-into-city.jpg"
                    alt="Emergency Response"
                    fill
                    className="object-cover object-center opacity-40"
                    priority
                />
            </div>

            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none"></div>

            <div className="relative z-20 w-full max-w-lg p-1 px-4 sm:px-0">
                <div className="bg-zinc-950/40 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="flex flex-col items-center mb-8 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-200 backdrop-blur-md mb-6 shadow-lg shadow-red-900/10 scale-90">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                <span className="text-[10px] font-bold tracking-widest uppercase">Registry Node</span>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <ShieldAlert className="h-8 w-8 text-red-600" />
                                <h1 className="text-3xl font-black tracking-tighter text-white">
                                    SOS <span className="text-red-500">KSAR</span>
                                </h1>
                            </div>
                            <p className="text-zinc-400 text-sm font-medium max-w-xs">
                                Join the emergency response network and help your community.
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">
                            {error && (
                                <div className="p-4 bg-red-950/30 border border-red-500/20 rounded-2xl text-red-100 text-xs text-center font-bold flex items-center justify-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Identity</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Comm Channel</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="operator@sosksar.ma"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Secure Key</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-800 focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Operational Role</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value as any)}
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-10 text-white appearance-none focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500/50 transition-all font-bold"
                                        >
                                            <option value="citizen" className="bg-zinc-950 text-white font-bold">Citizen (General Support)</option>
                                            <option value="volunteer" className="bg-zinc-950 text-white font-bold">Volunteer (Field Action)</option>
                                            <option value="admin" className="bg-zinc-950 text-white font-bold">Admin (Coordination)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <ArrowRight className="h-4 w-4 text-zinc-600 rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black h-16 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all transform active:scale-[0.98] border-0 text-md tracking-tighter mt-2"
                            >
                                {loading ? "ENROLLING..." : (
                                    <span className="flex items-center gap-2">
                                        ENROLL IN SYSTEM
                                        <ArrowRight className="h-5 w-5" />
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-8">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                                <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-zinc-950/0 px-4 text-zinc-600 tracking-[0.2em]">Universal Auth</span></div>
                            </div>

                            <Button
                                type="button"
                                onClick={handleGoogleSignIn}
                                variant="outline"
                                className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-black flex items-center justify-center gap-3 border-0 tracking-tighter"
                            >
                                <Chrome className="w-6 h-6 text-red-500" />
                                REGISTER WITH GOOGLE
                            </Button>
                        </div>

                        <div className="mt-10 text-center">
                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                Already in system? <Link href="/login" className="text-white hover:text-red-500 transition-colors ml-2 underline decoration-red-600 underline-offset-4">Log in to Station</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <RegisterContent />
        </Suspense>
    );
}
