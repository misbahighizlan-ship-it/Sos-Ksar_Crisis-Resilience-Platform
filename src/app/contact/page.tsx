import { Metadata } from "next";
import Navbar from "@/components/Navbars/Navbar";
import Footer from "@/components/Footer/Footer";
import ContactForm from "./ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact | SOS KSAR",
    description: "Contactez le centre de coordination SOS KSAR",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black">
            <Navbar />

            <section className="relative flex-grow flex items-center justify-center py-12 px-4 md:px-6">
                {/* Background Map/Texture */}
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black/5 to-black/5 pointer-events-none"></div>

                <div className="container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">

                    {/* Left Column: Contact Info */}
                    <div className="flex flex-col justify-center space-y-8 lg:pr-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-200 text-xs font-bold uppercase tracking-wider border border-red-200 dark:border-red-900/30">
                                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                Centre de Coordination
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight">
                                Restons <span className="text-red-600">Connectés</span>
                            </h1>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                En cas d'urgence critique, utilisez la ligne directe. Pour toute autre demande, partenariat ou volontariat, envoyez-nous un message sécurisé.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-105">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                                    <Phone className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-zinc-500">Ligne d'Urgence (24/7)</p>
                                    <p className="text-xl font-black text-zinc-900 dark:text-white">05 39 00 00 00</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-105">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-zinc-500">Email Officiel</p>
                                    <p className="text-xl font-black text-zinc-900 dark:text-white">contact@sosksar.ma</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-105">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-bold text-zinc-500">QG Opérationnel</p>
                                    <p className="text-lg font-bold text-zinc-900 dark:text-white">Centre Ville, Ksar El Kebir</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="flex items-center">
                        <ContactForm />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
