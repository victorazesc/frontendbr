"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Account, User } from "@prisma/client";
import { Pencil, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const { data, status } = useSession();
    const [profile, setProfile] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await fetch('/api/me');
            const data = await res.json();
            setProfile(data);
        };

        if (status === "authenticated") {
            fetchProfile();
        }
    }, [status]);

    if (status === "loading" || !profile) return <p>Carregando...</p>;
    return (
        <Card className="w-full h-full flex flex-col gap-4">
            <div className="px-6">
                <h1 className="text-2xl flex items-center gap-2">
                    Configurações da conta
                </h1>
                <h4 className="text-sm text-muted-foreground">
                    Gerencie o login da sua conta, suas conexões de redes sociais, sua segurança e mais.
                </h4>
            </div>
            <Separator />
            <div className="flex flex-col gap-4 px-6">
                <h2 className="text-xl mb-6">E-mail e senha</h2>

                <div className="flex justify-between items-center w-full">
                    <div>
                        <Label className="mb-2">Endereço de e-mail</Label>
                        <span className="text-muted-foreground">{data?.user.email}</span>
                    </div>
                    <Button variant={"ghost"}><Pencil size={20} /></Button>
                </div>
                <Separator />
                <div className="flex justify-between items-center w-full">
                    <div>
                        <Label className="mb-2">Senha atual</Label>
                        <span className="text-muted-foreground">*******************</span>
                    </div>
                    <Button variant={"ghost"}><Pencil size={20} /></Button>
                </div>

            </div>
            <Separator />
            <div className="px-6">
                <h1 className="text-xl flex items-center gap-2">
                    Conexões de redes sociais
                </h1>
                <h4 className="text-sm text-muted-foreground">
                    Gerencie o login da sua conta, suas conexões de redes sociais, sua segurança e mais.
                </h4>

                {profile?.accounts?.map((account: Account) => {
                    return (
                        <div className="flex gap-4 items-center mt-8" key={account.provider}>
                            <Image src={`/${account.provider}.svg`} width={40} height={40} alt={account.provider} />
                            <span>{account.provider.charAt(0).toUpperCase() + account.provider.slice(1)}</span>
                        </div>
                    )
                }
                )}

            </div>
        </Card>
    )
}