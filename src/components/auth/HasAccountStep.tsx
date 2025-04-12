import { Label } from "@radix-ui/react-dropdown-menu";
import { UserCircle2, Github } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";


interface HasAccountStepProps {
    provider: string
    email: string
    onBack: () => void
}

export default function HasAccountStep({ provider, email, onBack }: HasAccountStepProps) {

    const handleGithubLogin = async () => {
        await signIn("github", { callbackUrl: "/" })
    }

    const handleGoogleLogin = async () => {
        await signIn("google", { callbackUrl: "/" })
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle className="text-center py-4">Que bom te ver de volta</DialogTitle>
                <DialogDescription className="text-center py-2">
                    Entre com sua conta do Google na conta {email}.
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

            <DialogFooter>
                {provider === 'github' && (
                    <Button variant="outline" className="flex-1 my-6" onClick={handleGithubLogin}>
                        <Github className="mr-2 size-4" /> Github
                    </Button>
                )}
                {provider === 'google' && (
                    <Button variant="outline" className="flex-1 my-6" onClick={handleGoogleLogin}>
                        G Google
                    </Button>
                )}
            </DialogFooter>
        </>
    )
}