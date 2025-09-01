// src/app/api/my-jobs/route.ts
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                labels: true
            }
        })

        return NextResponse.json(jobs)
    } catch (error) {
        console.error("Erro ao buscar jobs do usuário:", error)
        return NextResponse.json({ error: "Erro interno" }, { status: 500 })
    }
}