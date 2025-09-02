'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import {
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"

interface SignInDialogProps {
    email: string
    step: 'SIGNIN' | 'SIGNUP' | 'HASACCOUNT'
    onBack: () => void
    provider: string | null
}

export default function SignInPasswordStep({ step, onBack, provider, email }: SignInDialogProps) {
    const [password, setPassword] = useState('')
    const handleEmailLogin = async () => {
        if (email) await signIn("credentials", { email, password, callbackUrl: "/", redirect: false })
    }
    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-center py-4">Nossas boas-vindas ao canal Fronted BR!</DialogTitle>
                <DialogDescription className="text-center py-2">
                    Digite sua senha para logar com o e-mail {email}.
                </DialogDescription>
                <DialogDescription className="text-center py-2">
                    <Button
                        variant="link"
                        className="text-sm underline"
                        onClick={onBack}
                    >
                        Entrar com outra conta
                    </Button>
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
                <div className="flex flex-col justify-start gap-4 pb-4">
                    <Label className="text-left">
                        Senha
                    </Label>

                    <Input id="password" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button className="w-full" onClick={handleEmailLogin} type="submit">Iniciar sessão</Button>
            </DialogFooter>
        </>
    )
}
