"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldAlert } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const profileRef = useRef<HTMLDivElement>(null);

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await authClient.signOut();
        router.refresh();
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/#about" },
        { name: "Contact", href: "/#contact" },
    ];

    interface NavItem {
        name: string;
        href: string;
    }

    const getRoleBasedLinks = (): NavItem[] => {
        if (!session) return [];
        const user = session.user as any;
        const role = user.role;

        if (role === "citizen" || role === "volunteer" || role === "admin") {
            return [{ name: "Add Urgence", href: "/urgency/create" }];
        }

        return [];
    };

    const roleLinks = getRoleBasedLinks();

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-background/95 backdrop-blur-md shadow-md border-b py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                    </div>
                    <span
                        className={cn(
                            "text-xl font-bold transition-colors",
                            isScrolled ? "text-foreground" : "text-white"
                        )}
                    >
                        SOS <span className="text-primary">Ksar</span>
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium hover:text-primary transition-colors",
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

                        {roleLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium hover:text-primary transition-colors",
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
                        {isPending ? (
                            <div className="text-sm text-muted-foreground">Loading...</div>
                        ) : session ? (
                            <div className="relative" ref={profileRef}>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={cn(
                                        isScrolled ? "text-foreground" : "text-white"
                                    )}
                                >
                                    {session.user.name || "Profile"}
                                </Button>

                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black z-50">
               <Link
    href={
        session.user.role === "admin"
            ? "/admin/profile"
            : "/profile"
    }
    onClick={() => setIsProfileOpen(false)}
    className="block px-4 py-2 text-sm hover:bg-gray-100"
>
    {session.user.role === "volunteer"
        ? "Volunteer Dashboard"
        : session.user.role === "admin"
        ? "Admin Dashboard"
        : "My Profile"}
</Link>



                                        <button
                                            onClick={() => {
                                                handleSignOut();
                                                setIsProfileOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button variant="outline" size="sm">
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile toggle */}
                <button
                    className={cn(
                        "md:hidden p-2",
                        isScrolled ? "text-foreground" : "text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
