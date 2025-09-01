'use client'

import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Home, User, LogOut, Briefcase } from "lucide-react"
import clsx from "clsx"

export default function Sidebar() {
    const { data: session } = useSession()
    const pathname = usePathname()

    if (!session) return null

    const user = session.user

    const navLinks = [
        { label: "Perfil", href: "/profile", icon: User },
        { label: "Minhas Vagas", href: "/my-jobs", icon: Briefcase },
    ]

    return (
        <aside className="h-[calc(100vh_-_130px)] flex flex-col justify-between p-6">
            {/* Usuário */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback>{user?.name?.[0] || "?"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                </div>

                {/* Navegação */}
                <nav className="mt-6 flex flex-col gap-2">
                    {navLinks.map(({ label, href, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                                pathname === href ? "font-semibold" : "text-muted-foreground"
                            )}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Sair */}
            <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-red-500 hover:text-red-600 flex items-center gap-2 justify-start"
            >
                <LogOut size={16} /> Sair
            </Button>
        </aside>
    )
}