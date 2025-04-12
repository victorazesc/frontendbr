'use client'

import { useState } from "react"
import SignInStep from "./SignInStep"
import SignUpStep from "./SignUpStep"
import HasAccountStep from "./HasAccountStep"
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { Button } from "../ui/button"
import { UserCircle2 } from "lucide-react"
import SignInPasswordDialog from "./SignInPasswordStep"

export default function AuthDialog() {
    const [step, setStep] = useState<'SIGNIN'| 'SIGNINPASS' | 'SIGNUP' | 'HASACCOUNT'>('SIGNIN')
    const [email, setEmail] = useState<string>('')
    const [provider, setProvider] = useState<string | null>(null)

    const handleEmailCheck = async (emailInput: string) => {
        setEmail(emailInput)
        const res = await fetch("/api/auth/check-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: emailInput })
        })
        const { exists, provider } = await res.json()

        if (exists && provider) {
            setProvider(provider)
            setStep('HASACCOUNT')
        } else if (exists) {
            setStep('SIGNINPASS') // Já existe, mas sem provedor
        } else {
            setStep('SIGNUP')
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <UserCircle2 />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                {step === 'SIGNIN' && (
                    <SignInStep onEmailCheck={handleEmailCheck} step={step} provider={null} />
                )}
                {step === 'SIGNUP' && (
                    <SignUpStep email={email} onBack={() => setStep('SIGNIN')} />
                )}
                {step === 'HASACCOUNT' && (
                    <HasAccountStep email={email} provider={provider || ''} onBack={() => setStep('SIGNIN')} />
                )}
                {step === 'SIGNINPASS' && (
                    <SignInPasswordDialog email={email} provider={provider} onBack={() => setStep('SIGNIN')} step={"SIGNIN"} />
                )}
            </DialogContent>
        </Dialog>
    )
}
