"use client";

import Link from "next/link";
import { ShieldAlert, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const quickLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
    ];

    const resourcesLinks = [
        { label: "Emergency Report", href: "/report" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ];

    return (
        <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t border-primary/20 relative overflow-hidden">
            
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="h-8 w-8 text-primary" />
                            <span className="text-2xl font-bold tracking-tight">
                                SOS <span className="text-primary">Ksar</span>
                            </span>
                        </div>

                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Coordinating rapid emergency response and improving community safety in Ksar El Kebir.
                        </p>

                        <div className="flex items-center gap-4 pt-2">
                            <Link href="#" className="p-2 rounded-full bg-background/5 hover:bg-primary/20 hover:text-primary transition-all">
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-background/5 hover:bg-primary/20 hover:text-primary transition-all">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full bg-background/5 hover:bg-primary/20 hover:text-primary transition-all">
                                <Instagram className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-primary/50"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-foreground">Resources</h3>
                        <ul className="space-y-3">
                            {resourcesLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-primary/50"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-foreground">Emergency Contact</h3>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">Hotline (24/7)</p>
                                    <p className="text-sm text-muted-foreground">+212 555-0123</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">Email Support</p>
                                    <p className="text-sm text-muted-foreground">help@sosksar.ma</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium text-foreground">Location</p>
                                    <p className="text-sm text-muted-foreground">Ksar El Kebir, Morocco</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © 2026 SOS Ksar. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
