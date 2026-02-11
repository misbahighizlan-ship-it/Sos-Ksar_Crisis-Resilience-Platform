"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldAlert } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

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

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

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
                        <Button variant="ghost" size="sm" className="hidden lg:flex cursor-pointer">
                            Login
                        </Button>
                        <Button variant="outline" size="sm" className="hidden lg:flex cursor-pointer">
                            Register
                        </Button>
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            Report Emergency
                        </Button>
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
                                "py-2 text-lg font-medium border-b border-border/10 last:border-0 cursor-pointer transition-colors",
                                isScrolled ? "text-foreground/80" : "text-white"
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-center cursor-pointer",
                                isScrolled ? "text-foreground/80 border-border/50" : "text-white border-white"
                            )}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-full justify-center cursor-pointer",
                                isScrolled ? "text-foreground/80 border-border/50" : "text-white border-white"
                            )}
                        >
                            Register
                        </Button>
                        <Button
                            className={cn(
                                "w-full justify-center bg-primary text-white cursor-pointer"
                            )}
                        >
                            Report Emergency
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
