"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { BookOpenText, Github, Heart, UserCircle2 } from "lucide-react"
import { useFavorites } from "@/stores/useFavorites"
import { ThemeSwitcher } from "./ui/ThemeSwitcher"
import Link from "next/link"
import { Label } from "@radix-ui/react-dropdown-menu"
import Auth from "./auth/auth"
import { signOut, useSession } from "next-auth/react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function NavBar() {
    const { showFavorites, setShowFavorites } = useFavorites();
    const { data } = useSession()
    return (
        <div className="text-xl text-right flex gap-8 justify-between pb-6 w-full p-6 items-center border-b">
            <Link href={'/'} className="no-underline text-inherit">
                <div className="flex gap-2">
                    <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
                    <span className="font-medium">Frontend BR</span>
                </div>
            </Link>

            <div className="flex items-center">
                <Button variant="ghost" size={'icon'} onClick={() => setShowFavorites()}>
                    <Heart
                        size={20}
                        fill={showFavorites ? "currentColor" : "none"}
                        className={showFavorites ? "text-primary" : "text-foreground"}
                    />
                </Button>

                <ThemeSwitcher />

                <Button asChild variant="ghost" size="icon">
                    <Link href="/about" className="text-primary-foreground">
                        <BookOpenText size={20} />
                    </Link>
                </Button>

                <Button asChild variant="ghost" size="icon">
                    <Link href="https://github.com/victorazesc/frontendbr" target="blank" className="text-primary-foreground">
                        <Github size={20} />
                    </Link>
                </Button>




                {data?.user ? <>                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <UserCircle2 size={20} className="text-primary-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href="/profile" className="no-underline text-inherit">
                                Perfil
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href="/job" className="no-underline text-inherit">
                                Adicionar Vaga
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                            <Label className="text-left">
                                Sair
                            </Label>

                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu></> :
                    <Auth />
                }
            </div>
        </div>
    )
}