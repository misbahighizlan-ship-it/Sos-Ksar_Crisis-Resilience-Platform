// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, ShieldAlert, User, LogOut, LayoutDashboard, FileText, Settings, Users, Calendar, AlertTriangle } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { cn } from "@/lib/utils";

// type UserRole = "guest" | "citizen" | "volunteer" | "admin";

// interface NavItem {
//     label: string;
//     href: string;
//     icon?: React.ElementType;
// }

// export function RoleNavbar() {
//     const [role, setRole] = React.useState<UserRole>("guest");
//     const [isOpen, setIsOpen] = React.useState(false);
//     const pathname = usePathname();

//     const closeMenu = () => setIsOpen(false);

//     // Mock Session Data
//     const session = {
//         user: {
//             name: "John Doe",
//             email: "john.doe@example.com",
//             image: "https://github.com/shadcn.png",
//             role: role,
//         },
//     };

//     const navItems: Record<UserRole, NavItem[]> = {
//         guest: [
//             { label: "Home", href: "/" },
//             { label: "About", href: "/about" },
//             { label: "Contact", href: "/contact" },
//         ],
//         citizen: [
//             { label: "Home", href: "/" },
//             { label: "Report Emergency", href: "/report", icon: AlertTriangle },
//             { label: "My Reports", href: "/my-reports", icon: FileText },
//         ],
//         volunteer: [
//             { label: "Home", href: "/" },
//             { label: "Assigned Emergencies", href: "/assigned", icon: ShieldAlert },
//             { label: "Available Shifts", href: "/shifts", icon: Calendar },
//         ],
//         admin: [
//             { label: "Home", href: "/" },
//             { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//             { label: "Manage Users", href: "/users", icon: Users },
//             { label: "Manage Reports", href: "/reports", icon: FileText },
//         ],
//     };

//     const currentNavItems = navItems[role];

//     return (
//         <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//             <div className="container mx-auto px-4">
//                 <div className="flex h-16 items-center justify-between">
//                     {/* Logo */}
//                     <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={closeMenu}>
//                         <ShieldAlert className="h-6 w-6 text-red-600 animate-pulse" />
//                         <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
//                             SOS Ksar
//                         </span>
//                     </Link>

//                     {/* Desktop Navigation */}
//                     <div className="hidden md:flex items-center gap-6">
//                         {currentNavItems.map((item) => (
//                             <Link
//                                 key={item.href}
//                                 href={item.href}
//                                 className={cn(
//                                     "text-sm font-medium transition-colors hover:text-primary flex items-center gap-2",
//                                     pathname === item.href ? "text-foreground" : "text-muted-foreground"
//                                 )}
//                             >
//                                 {item.icon && <item.icon className="h-4 w-4" />}
//                                 {item.label}
//                             </Link>
//                         ))}
//                     </div>

//                     {/* Right Side Actions */}
//                     <div className="hidden md:flex items-center gap-4">
//                         {/* Role Switcher (For Testing) */}
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <Button variant="outline" size="sm" className="hidden lg:flex">
//                                     Role: {role.charAt(0).toUpperCase() + role.slice(1)}
//                                 </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                                 <DropdownMenuLabel>Switch Role (Dev)</DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 <DropdownMenuRadioGroup value={role} onValueChange={(val) => setRole(val as UserRole)}>
//                                     <DropdownMenuRadioItem value="guest">Guest</DropdownMenuRadioItem>
//                                     <DropdownMenuRadioItem value="citizen">Citizen</DropdownMenuRadioItem>
//                                     <DropdownMenuRadioItem value="volunteer">Volunteer</DropdownMenuRadioItem>
//                                     <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
//                                 </DropdownMenuRadioGroup>
//                             </DropdownMenuContent>
//                         </DropdownMenu>

//                         {role === "guest" ? (
//                             <div className="flex items-center gap-2">
//                                 <Button variant="ghost" asChild>
//                                     <Link href="/login">Login</Link>
//                                 </Button>
//                                 <Button asChild className="bg-red-600 hover:bg-red-700">
//                                     <Link href="/register">Register</Link>
//                                 </Button>
//                             </div>
//                         ) : (
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                     <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all">
//                                         <Avatar className="h-9 w-9">
//                                             <AvatarImage src={session.user.image} alt={session.user.name} />
//                                             <AvatarFallback>
//                                                 {session.user.name
//                                                     .split(" ")
//                                                     .map((n) => n[0])
//                                                     .join("")}
//                                             </AvatarFallback>
//                                         </Avatar>
//                                     </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent className="w-56" align="end" forceMount>
//                                     <DropdownMenuLabel className="font-normal">
//                                         <div className="flex flex-col space-y-1">
//                                             <p className="text-sm font-medium leading-none">{session.user.name}</p>
//                                             <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
//                                         </div>
//                                     </DropdownMenuLabel>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem asChild>
//                                         <Link href="/profile" className="cursor-pointer">
//                                             <User className="mr-2 h-4 w-4" />
//                                             <span>Profile</span>
//                                         </Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuItem asChild>
//                                         <Link href="/settings" className="cursor-pointer">
//                                             <Settings className="mr-2 h-4 w-4" />
//                                             <span>Settings</span>
//                                         </Link>
//                                     </DropdownMenuItem>
//                                     <DropdownMenuSeparator />
//                                     <DropdownMenuItem
//                                         className="text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer"
//                                         onClick={() => setRole("guest")}
//                                     >
//                                         <LogOut className="mr-2 h-4 w-4" />
//                                         <span>Log out</span>
//                                     </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         )}
//                     </div>

//                     {/* Mobile Menu Toggle */}
//                     <div className="flex md:hidden items-center gap-2">
//                         <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
//                             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                         </Button>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Menu */}
//             {isOpen && (
//                 <div className="md:hidden border-t bg-background animate-in slide-in-from-top-5 duration-200">
//                     <div className="space-y-1 px-4 py-4">
//                         {/* Role Switcher Mobile */}
//                         <div className="mb-4 pb-4 border-b">
//                             <p className="text-sm text-muted-foreground mb-2">Simulate Role:</p>
//                             <div className="flex gap-2 flex-wrap">
//                                 {(["guest", "citizen", "volunteer", "admin"] as const).map((r) => (
//                                     <Button
//                                         key={r}
//                                         variant={role === r ? "default" : "outline"}
//                                         size="sm"
//                                         onClick={() => setRole(r)}
//                                         className="text-xs"
//                                     >
//                                         {r.charAt(0).toUpperCase() + r.slice(1)}
//                                     </Button>
//                                 ))}
//                             </div>
//                         </div>

//                         {currentNavItems.map((item) => (
//                             <Link
//                                 key={item.href}
//                                 href={item.href}
//                                 onClick={closeMenu}
//                                 className="flex items-center gap-2 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md px-2 transition-all"
//                             >
//                                 {item.icon && <item.icon className="h-5 w-5" />}
//                                 {item.label}
//                             </Link>
//                         ))}

//                         <div className="pt-4 border-t mt-2 space-y-2">
//                             {role === "guest" ? (
//                                 <>
//                                     <Button variant="outline" asChild className="w-full justify-start">
//                                         <Link href="/login" onClick={closeMenu}>
//                                             Login
//                                         </Link>
//                                     </Button>
//                                     <Button asChild className="w-full justify-start bg-red-600 hover:bg-red-700">
//                                         <Link href="/register" onClick={closeMenu}>
//                                             Register
//                                         </Link>
//                                     </Button>
//                                 </>
//                             ) : (
//                                 <>
//                                     <Button variant="ghost" asChild className="w-full justify-start">
//                                         <Link href="/profile" onClick={closeMenu}>
//                                             <User className="mr-2 h-4 w-4" />
//                                             Profile
//                                         </Link>
//                                     </Button>
//                                     <Button
//                                         variant="ghost"
//                                         className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
//                                         onClick={() => {
//                                             setRole("guest");
//                                             closeMenu();
//                                         }}
//                                     >
//                                         <LogOut className="mr-2 h-4 w-4" />
//                                         Log out
//                                     </Button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }
