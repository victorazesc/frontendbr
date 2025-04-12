import { Label } from "@radix-ui/react-dropdown-menu";
import { UserCircle2, Github } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface SignUpStepProps {
    email: string
    onBack: () => void
    // onSignup: (email: string, password: string) => void
}

export default function SignUpStep({ email, onBack }: SignUpStepProps) {
    const [password, setPassword] = useState('')

    const handleSignup = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        })

        if (res.ok) {
            // ✅ Se criou com sucesso, loga automaticamente
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/",
            })
        } else {
            const data = await res.json()
            alert(data.error || "Erro ao criar conta")
        }
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-center py-4">Nossas boas-vindas ao canal Fronted BR!</DialogTitle>
                <DialogDescription className="text-center py-2">
                    crie sua conta com o e-mail {email}.
                </DialogDescription>
                <DialogDescription className="text-center py-2">
                    <Button
                        variant="link"
                        className="text-sm underline"
                        onClick={onBack}
                    >
                        Criar conta outro email
                    </Button>
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
                <div className="flex flex-col justify-start gap-4 pb-4">
                    <Label className="text-left">
                        Senha
                    </Label>

                    <Input id="name" value={password}
                        onChange={(e) => setPassword(e.target.value)} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button variant={"default"} className="bg-accent-foreground w-full hover:bg-accent-foreground/80" onClick={handleSignup} type="submit">Criar Conta</Button>
            </DialogFooter>
        </>
    )
}