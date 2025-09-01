import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import axios from "axios"
import { extractCompanyName } from "@/utils/extractCompanyName"
import { hasSalaryInfo } from "@/utils/hasSalaryInfo"
import type { Vacancy } from "@/components/ui/vancancyCard"
import { extractCompanyDomain } from "@/utils/extractCompanyDomain"
import { extractLocation } from "@/utils/extractLocation"
import { extractApplyInfo } from "@/utils/extractApplyInfo"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    // 1. Busca do GitHub
    const response = await axios.get(
      `https://api.github.com/repos/frontendbr/vagas/issues?state=open`
    );

    const githubVagas = response.data.map((vaga: Vacancy) => ({
      ...vaga,
      companyName: extractCompanyName({ title: vaga.title, body: vaga.body }),
      hasSalaryInfo: hasSalaryInfo(vaga),
      companyDomain: extractCompanyDomain(vaga),
      location: extractLocation(vaga),
      subscriptionAction: extractApplyInfo(vaga.body),
      source: "GITHUB",
    }));

    // 2. Busca do banco (pode filtrar se quiser)
    const dbVagas = await prisma.job.findMany({
      include: {
        labels: true,
      },
    });

    const enrichedDbVagas = dbVagas.map((vaga) => ({
      ...vaga,
      // compat: sinaliza que é do banco e se pertence ao usuário logado
      source: "DATABASE",
      isMine: session?.user?.id ? vaga.userId === session.user.id : false,
      // opcional: normaliza o campo para o sorter atual
      created_at: (vaga as any).created_at ?? vaga.createdAt,
    }));

    // 3. Junta as duas fontes
    const allVagas = [...githubVagas, ...enrichedDbVagas];

    return NextResponse.json(allVagas);
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return NextResponse.json({ error: "Erro ao buscar vagas" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  try {
    const job = await prisma.job.create({
      data: {
        title: body.title,
        location: body.location,
        hasSalaryInfo: body.hasSalaryInfo === "true",
        jobContractType: body.jobContractType,
        jobSeniority: body.jobSeniority,
        companyName: body.companyName,
        companyDomain: body.companyDomain,
        companyIcon: null,
        subscriptionAction: body.subscriptionAction,
        companyDocument: body.companyDocument,
        body: body.body,
        state: 'open',
        createdAt: new Date(),
        updatedAt: new Date(),
        repository: "FRONTENDBR",
        userId: session.user.id, // Associa com o usuário logado
      },
    })

    return NextResponse.json(job)
  } catch (error) {
    console.error("Erro ao salvar a vaga:", error)
    return NextResponse.json({ error: "Erro interno ao salvar a vaga" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const jobId = body.id

  if (!jobId) {
    return NextResponse.json({ error: "ID da vaga é obrigatório" }, { status: 400 })
  }

  try {
    const existingJob = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!existingJob) {
      return NextResponse.json({ error: "Vaga não encontrada" }, { status: 404 })
    }

    if (existingJob.userId !== session.user.id) {
      return NextResponse.json({ error: "Você não tem permissão para editar essa vaga" }, { status: 403 })
    }
    console.log("Atualizando vaga com ID:", jobId, "com dados:", body)
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title: body.title,
        location: body.location,
        hasSalaryInfo: body.hasSalaryInfo === "true",
        jobContractType: body.jobContractType,
        jobSeniority: body.jobSeniority,
        companyName: body.companyName,
        companyDomain: body.companyDomain,
        companyIcon: null,
        subscriptionAction: body.subscriptionAction,
        companyDocument: body.companyDocument,
        body: body.body,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedJob)
  } catch (error) {
    console.error("Erro ao editar a vaga:", error)
    return NextResponse.json({ error: "Erro interno ao editar a vaga" }, { status: 500 })
  }
}
