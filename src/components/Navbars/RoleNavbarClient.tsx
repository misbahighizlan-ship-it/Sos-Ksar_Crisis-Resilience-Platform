"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldAlert, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

interface RoleNavbarClientProps {
    session: Session | null;
}

const RoleNavbarClient = ({ session }: RoleNavbarClientProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const user = session?.user;
    const role = user?.role || "guest";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/login";
                },
            },
        });
    };

    // Define links based on role
    const getNavLinks = () => {
        const commonLinks = [{ name: "Home", href: "/" }];

        if (!session) {
            // Guest
            return [
                ...commonLinks,
                { name: "About", href: "/about" }, // Changed from #about to /about to be safe, or keep # as per request to keep design? Request said: "Show: Home, About, Contact, Login, Register". Existing had #about. Let's keep /about if they exist or # if not. User didn't specify path for these, but "Home, About, Contact". I will use /about /contact safely.
                { name: "Contact", href: "/contact" },
            ];
        }

        if (role === "citizen") {
            return [
                ...commonLinks,
                { name: "Add Urgence", href: "/reports/new" },
            ];
        }

        if (role === "volunteer") {
            return [
                ...commonLinks,
                { name: "Add Urgence", href: "/reports/new" },
            ];
        }

        if (role === "admin") {
            return [
                ...commonLinks,
                { name: "Dashboard", href: "/dashboard" },
                { name: "Manage Users", href: "/users" },
                { name: "Manage Reports", href: "/reports" },
                { name: "Add Urgence", href: "/reports/new" },
            ];
        }

        return commonLinks;
    };

    const navLinks = getNavLinks();

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-background/95 backdrop-blur-md shadow-md border-b border-border/10 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                    </div>
                    <span
                        className={cn(
                            "text-xl font-bold tracking-tight transition-colors duration-300",
                            isScrolled ? "text-foreground" : "text-white"
                        )}
                    >
                        SOS <span className="text-primary">Ksar</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                                    pathname === link.href
                                        ? "text-primary"
                                        : isScrolled
                                            ? "text-foreground/80"
                                            : "text-white"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 pl-6 border-l border-border/20">
                        {!session ? (
                            <>
                                <Button variant="ghost" size="sm" className="hidden lg:flex cursor-pointer" asChild>
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="hidden lg:flex cursor-pointer" asChild>
                                    <Link href="/register">Register</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 cursor-pointer"
                                    asChild
                                >
                                    <Link href="/login">Report Emergency</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" size="sm" className="hidden lg:flex cursor-pointer" asChild>
                                    <Link href="/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className={cn("hidden lg:flex cursor-pointer", isScrolled ? "" : "text-white hover:text-foreground border-white/50 hover:bg-white")}
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2 transition-colors",
                        isScrolled ? "text-foreground" : "text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "py-2 text-lg font-medium border-b border-border/10 last:border-0 cursor-pointer transition-colors text-foreground/80"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-4">
                        {!session ? (
                            <>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center cursor-pointer text-foreground/80 border-border/50"
                                    asChild
                                >
                                    <Link href="/login">Login</Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center cursor-pointer text-foreground/80 border-border/50"
                                    asChild
                                >
                                    <Link href="/register">Register</Link>
                                </Button>
                                <Button
                                    className="w-full justify-center bg-primary text-white cursor-pointer"
                                    asChild
                                >
                                    <Link href="/login">Report Emergency</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center cursor-pointer text-foreground/80 border-border/50"
                                    asChild
                                >
                                    <Link href="/profile">Profile</Link>
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full justify-center cursor-pointer"
                                    onClick={handleSignOut}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default RoleNavbarClient;
