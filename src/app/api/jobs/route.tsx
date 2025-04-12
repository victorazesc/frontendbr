import { PrismaClient } from "@prisma/client";
import { extractApplyInfo } from "@/utils/extractApplyInfo";
import { extractCompanyDomain } from "@/utils/extractCompanyDomain";
import { extractCompanyName } from "@/utils/extractCompanyName";
import { extractLocation } from "@/utils/extractLocation";
import { hasSalaryInfo } from "@/utils/hasSalaryInfo";
import axios from "axios";
import { NextResponse } from "next/server";
import type { Vacancy } from "@/components/ui/vancancyCard";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
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
      source: "DATABASE",
    }));

    // 3. Junta as duas fontes
    const allVagas = [...githubVagas, ...enrichedDbVagas];

    return NextResponse.json(allVagas);
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    return NextResponse.json({ error: "Erro ao buscar vagas" }, { status: 500 });
  }
}