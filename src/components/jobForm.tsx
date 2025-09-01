'use client'

import { useFormik } from "formik"
import * as Yup from "yup"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EditorDemo } from "./ui/markdown"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Tiptap from "./titap"

export default function JobForm() {
    const [markdown, setMarkdown] = useState("")
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            title: '',
            location: '',
            jobContractType: '',
            jobSeniority: '',
            hasSalaryInfo: '',
            companyName: '',
            companyDomain: '',
            companyDocument: '',
            subscriptionAction: '',
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Campo obrigatório"),
            location: Yup.string().required("Campo obrigatório"),
            jobContractType: Yup.string().required("Campo obrigatório"),
            jobSeniority: Yup.string().required("Campo obrigatório"),
            companyName: Yup.string().required("Campo obrigatório"),
            companyDomain: Yup.string().required("Campo obrigatório"),
            companyDocument: Yup.string().required("Campo obrigatório"),
        }),
        onSubmit: async (values) => {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, body: markdown })
            })

            if (response.ok) {
                const job = await response.json()
                router.push(`/?id=${job.id}`)
            } else {
                alert("❌ Erro ao cadastrar a vaga")
            }
        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold">Cadastrar nova vaga</h1>
                <p className="text-muted-foreground">
                    Cadastre sua nova vaga e encontre o candidato certo
                </p>
            </div>

            <div className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-[35%_auto] gap-8 items-start">
                    {/* Coluna da esquerda */}
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-xl font-medium">Informações da Vaga</h2>
                            <p className="text-muted-foreground">Adicione informações relevantes para que os candidatos consigam encontrar a vaga facilmente</p>
                        </div>
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Título da vaga *</Label>
                                <Input
                                    id="title"
                                    placeholder="Ex: Desenvolvedor Frontend React"
                                    {...formik.getFieldProps("title")}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-sm text-red-500">{formik.errors.title}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="location">Localização *</Label>
                                <Input
                                    id="location"
                                    placeholder="Ex: Remoto ou São Paulo - SP"
                                    {...formik.getFieldProps("location")}
                                />
                                {formik.touched.location && formik.errors.location && (
                                    <p className="text-sm text-red-500">{formik.errors.location}</p>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label>Tipo de contrato *</Label>
                                <Select
                                    onValueChange={(value) => formik.setFieldValue("jobContractType", value)}
                                    value={formik.values.jobContractType}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ex: PJ, CLT, Freelancer..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PJ">PJ</SelectItem>
                                        <SelectItem value="CLT">CLT</SelectItem>
                                        <SelectItem value="Freelancer">Freelancer</SelectItem>
                                        <SelectItem value="Cooperado">Cooperado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Nível de senioridade *</Label>
                                <Select
                                    onValueChange={(value) => formik.setFieldValue("jobSeniority", value)}
                                    value={formik.values.jobSeniority}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ex: Estágio, Júnior, Pleno..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Estágio">Estágio</SelectItem>
                                        <SelectItem value="Júnior">Júnior</SelectItem>
                                        <SelectItem value="Pleno">Pleno</SelectItem>
                                        <SelectItem value="Sênior">Sênior</SelectItem>
                                        <SelectItem value="Tech Lead">Tech Lead</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Possui info de salário?</Label>
                                <Select
                                    onValueChange={(value) => formik.setFieldValue("hasSalaryInfo", value)}
                                    value={formik.values.hasSalaryInfo}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="true">Sim</SelectItem>
                                        <SelectItem value="false">Não</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Coluna direita: Editor */}
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <h2 className="text-xl font-medium">Descrição detalhada</h2>
                            <p className="text-muted-foreground">Adicione um texto bem explicativo contendo as informações necessarias que o candidato precisa para saber se é adequado à sua vaga</p>
                        </div>
                        <Tiptap value={markdown} onChange={setMarkdown} />
                    </div>
                </div>

                <div className="space-y-6">
                      <div className="space-y-2">
                            <h2 className="text-xl font-medium">Informações da Empresa</h2>
                            <p className="text-muted-foreground">As informações abaixo ajudam os candidatos a identificar sua empresa.</p>
                        </div>
 

                    <div className="grid gap-2">
                        <Label htmlFor="companyName">Nome da empresa *</Label>
                        <Input
                            id="companyName"
                            placeholder="Ex: Devopness"
                            {...formik.getFieldProps("companyName")}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="companyDomain">Domínio da empresa *</Label>
                        <Input
                            id="companyDomain"
                            placeholder="Ex: devopness.com"
                            {...formik.getFieldProps("companyDomain")}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="companyDocument">CNPJ da empresa *</Label>
                        <Input
                            id="companyDocument"
                            placeholder="Ex: 00.000.000/0001-00"
                            {...formik.getFieldProps("companyDocument")}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="subscriptionAction">Como se candidatar</Label>
                        <Input
                            id="subscriptionAction"
                            placeholder="Ex: https://empresa.com/carreiras"
                            {...formik.getFieldProps("subscriptionAction")}
                        />
                    </div>
                </div>
            </div>

            <Button className="w-full mt-6" type="submit">
                Salvar vaga
            </Button>
        </form>
    )
}   
