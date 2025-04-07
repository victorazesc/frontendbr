"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { BookOpenText, Github, Heart } from "lucide-react"
import { useFavorites } from "@/stores/useFavorites"
import { ThemeSwitcher } from "./ui/ThemeSwitcher"
import Link from "next/link"

export default function NavBar() {
    const { showFavorites, setShowFavorites } = useFavorites();
    return (
        <div className="text-xl text-right flex gap-8 justify-between pb-6 w-full p-6 items-center border-b">
            <div className="flex gap-2">
                <Image src={'/logo.svg'} width={40} height={40} alt="Logo" />
                <span className="font-medium">Frontend BR</span>
            </div>
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


            </div>
        </div>
    )
}