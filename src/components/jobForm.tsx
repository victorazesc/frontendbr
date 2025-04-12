'use client'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EditorDemo } from "./ui/markdown";


export default function JobForm() {
    return (
        <div className="py-10 px-4">
            <Card className="shadow-xl rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Cadastrar nova vaga</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-[35%_auto] gap-8">
                        {/* Coluna 1 - Infos rápidas */}
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título da vaga</Label>
                                <Input id="title" placeholder="Ex: Frontend Developer React" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="labels">Labels</Label>
                                <Input id="labels" placeholder="Ex: Pleno, PJ, Remoto" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="companyName">Empresa</Label>
                                <Input id="companyName" placeholder="Ex: Devopness" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="companyDomain">Domínio da empresa</Label>
                                <Input id="companyDomain" placeholder="Ex: devopness.com" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Localização</Label>
                                <Input id="location" placeholder="Ex: Remoto, São Paulo - SP" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="hasSalaryInfo">Possui info de salário?</Label>
                                <Select>
                                    <SelectTrigger id="hasSalaryInfo">
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Sim</SelectItem>
                                        <SelectItem value="false">Não</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="subscriptionAction">Como se candidatar</Label>
                                <Input
                                    id="subscriptionAction"
                                    placeholder="Ex: https://empresa.com/carreiras"
                                />
                            </div>
                        </div>

                        {/* Coluna 2 - Editor Markdown */}
                        <div className="grid gap-2">
                            <Label>Descrição da Vaga (Markdown)</Label>
                            <EditorDemo />
                        </div>
                    </div>

                    <Button className="w-full mt-6" type="submit">
                        Salvar vaga
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
