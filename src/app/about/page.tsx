import Navbar from "@/components/Navbars/Navbar";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Users, Heart, AlertTriangle, CheckCircle, Lock, ArrowRight, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "À propos | SOS KSAR",
    description: "Plateforme critique de gestion des secours à Ksar El Kebir",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
            <Navbar />

            {/* 1. Hero Section */}
            <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:to-black z-10" />
                    <Image
                        src="/large-tsunami-wave-crashing-into-city.jpg"
                        alt="Crisis Response Team"
                        fill
                        className="object-cover object-center opacity-60"
                        priority
                    />
                </div>

                {/* Hero Content */}
                <div className="container relative z-20 px-4 md:px-6 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-200 backdrop-blur-md mb-4 shadow-lg shadow-red-900/10">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-semibold tracking-wide uppercase">Urgency Response</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl drop-shadow-2xl">
                        Mission <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SOS KSAR</span>
                    </h1>

                    <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-lg font-medium">
                        Une réponse coordonnée et rapide face aux catastrophes.
                        <br className="hidden md:block" />
                        Unir Ksar El Kebir pour sauver des vies.
                    </p>
                </div>
            </section>

            {/* 2. Mission Section */}
            <section className="py-20 relative bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="container px-4 md:px-6 relative z-10 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-block">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
                                    Resilience & <span className="text-red-600">Unity</span>
                                </h2>
                                <div className="h-2 w-24 bg-red-600 rounded-full"></div>
                            </div>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                                SOS KSAR n'est pas seulement une plateforme, c'est un lien vital entre les citoyens, les équipes de secours et les ressources médicales lors des moments critiques.
                                Notre mission est de réduire le temps de réaction, d'optimiser la distribution des aides et d'assurer que personne ne soit laissé pour compte.
                            </p>

                            <ul className="space-y-4 mt-6">
                                {[
                                    "Coordination en temps réel des secours",
                                    "Priorisation intelligente des urgences par IA",
                                    "Transparence totale des opérations"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                                        <span className="text-lg font-medium text-zinc-800 dark:text-zinc-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 aspect-video flex items-center justify-center p-8 group hover:border-red-500/30 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-50"></div>
                                <Activity className="h-32 w-32 text-red-600/20 group-hover:text-red-600/40 transition-all duration-500 transform group-hover:scale-110" />
                                <div className="absolute bottom-8 left-8 right-8 text-center bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                    <p className="text-white font-bold text-sm uppercase tracking-widest">System Status: Operational</p>
                                </div>
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600/20 rounded-full blur-2xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-600/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. How It Works - The Workflow */}
            <section className="py-24 bg-white dark:bg-black relative">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-red-600 font-bold tracking-wider uppercase text-xs border border-red-200 dark:border-red-900/50 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-900/10">Flux d'intervention</span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mt-4">
                            Comment ça fonctionne
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-red-200 dark:via-red-900 to-transparent border-t-2 border-dashed border-zinc-300 dark:border-zinc-800 z-0"></div>

                        {[
                            {
                                title: "Alerte",
                                desc: "Signalement immédiat géolocalisé",
                                icon: AlertTriangle,
                                color: "text-orange-500"
                            },
                            {
                                title: "Dispatch",
                                desc: "Analyse et assignation des ressources",
                                icon: Activity,
                                color: "text-red-600"
                            },
                            {
                                title: "Secours",
                                desc: "Intervention rapide sur le terrain",
                                icon: Shield,
                                color: "text-emerald-500"
                            }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-32 h-32 rounded-full bg-zinc-50 dark:bg-zinc-900 border-4 border-white dark:border-zinc-800 shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-red-500/30">
                                    <step.icon className={`h-12 w-12 ${step.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Team & Reliability Grid */}
            <section className="py-24 bg-zinc-100 dark:bg-zinc-900/50">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Team Roles */}
                        <div className="col-span-1 md:col-span-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <Users className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
                                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Notre Force Humaine</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl">
                                    <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Corps Médical</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Médecins et infirmiers prêts à intervenir en première ligne.</p>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl">
                                    <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Logistique</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Experts en transport et gestion des ressources critiques.</p>
                                </div>
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl sm:col-span-2">
                                    <h4 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">Bénévoles Citoyens</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Le cœur de notre résilience : des voisins aidant des voisins.</p>
                                </div>
                            </div>
                        </div>

                        {/* Security */}
                        <div className="bg-zinc-950 dark:bg-black rounded-3xl p-8 border border-zinc-800 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Lock className="h-32 w-32 text-red-500" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <Lock className="h-10 w-10 text-red-600 mb-6" />
                                    <h3 className="text-2xl font-bold text-white mb-4">Données Sécurisées</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                        Nous utilisons <strong>Better Auth</strong> et une architecture <strong>Zero Trust</strong> pour garantir que chaque information sensible reste confidentielle et protégée contre les accès non autorisés.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-950/30 px-3 py-2 rounded-lg w-fit border border-emerald-900/50">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    ENCRYPTION: AES-256
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA Section */}
            <section className="py-24 relative overflow-hidden flex items-center justify-center bg-red-700 dark:bg-red-900">
                {/* Noise overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-multiply"></div>

                <div className="container relative z-10 px-4 md:px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 drop-shadow-lg">
                        REJOIGNEZ LA LIGNE DE FRONT
                    </h2>
                    <p className="text-lg md:text-xl text-red-100 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Votre engagement fait la différence. Inscrivez-vous maintenant pour être prêt quand Ksar aura besoin de vous.
                    </p>
                    <Link href="/login">
                        <Button size="lg" className="h-16 px-12 text-lg font-black bg-white text-red-700 hover:bg-zinc-100 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all transform hover:scale-105 rounded-full border-0">
                            S'INSCRIRE - C'EST URGENT
                            <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
