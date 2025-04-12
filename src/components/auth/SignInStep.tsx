'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Github } from "lucide-react"
import { Button } from "../ui/button"
import {
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"

interface SignInDialogProps {
    step: 'SIGNIN' | 'SIGNUP' | 'HASACCOUNT'
    onEmailCheck: (email: string) => void
    provider: string | null
}

export default function SignInStep({ step, onEmailCheck, provider }: SignInDialogProps) {
    const [email, setEmail] = useState('')

    const handleContinue = () => {
        if (email) onEmailCheck(email)
    }

    const handleGithubLogin = async () => {
        await signIn("github", { callbackUrl: "/" })
    }

    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/" })
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-center py-4">
                    Faça login agora ou crie um perfil gratuito para sua empresa
                </DialogTitle>
            </DialogHeader>

            <div className="flex items-center justify-center gap-4 py-6">
                <Button variant="outline" className="flex-1" onClick={handleGithubLogin}>
                    <Github className="mr-2 size-4" /> Github
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleGoogleLogin}>
                    G Google
                </Button>
            </div>

            <div className="text-center flex items-center gap-4">
                <span className="border h-0 flex-1" /> OU <span className="border h-0 flex-1" />
            </div>

            <div className="grid gap-4">
                <div className="flex flex-col gap-4 pb-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <DialogFooter>
                <Button
                    variant="default"
                    className="bg-accent-foreground w-full hover:bg-accent-foreground/80"
                    type="button"
                    onClick={handleContinue}
                >
                    Continuar com Email
                </Button>
            </DialogFooter>
        </>
    )
}
