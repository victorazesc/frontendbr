import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request, ctx: any) {
  const { params } = ctx ?? {}
  const job = await prisma.job.findUnique({
    where: { id: params?.id }
  })

  return NextResponse.json(job)
}

export async function PUT(req: Request, ctx: any) {
  const { params } = ctx ?? {}
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const id = params?.id

  try {
    const existing = await prisma.job.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Vaga não encontrada' }, { status: 404 })
    }
    if (existing.userId !== session.user.id) {
      return NextResponse.json({ error: 'Você não tem permissão para editar essa vaga' }, { status: 403 })
    }

    const updated = await prisma.job.update({
      where: { id },
      data: {
        title: body.title,
        location: body.location,
        hasSalaryInfo: body.hasSalaryInfo === 'true' || body.hasSalaryInfo === true,
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

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erro ao atualizar a vaga:', error)
    return NextResponse.json({ error: 'Erro interno ao atualizar a vaga' }, { status: 500 })
  }
}

export async function DELETE(req: Request, ctx: any) {
  const { params } = ctx ?? {}
  const id = params?.id as string | undefined
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  if (!id) {
    return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 })
  }
  try {
    const existing = await prisma.job.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ error: 'Vaga não encontrada' }, { status: 404 })
    }
    if (existing.userId !== session.user.id) {
      return NextResponse.json({ error: 'Sem permissão' }, { status: 403 })
    }
    await prisma.job.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Erro ao excluir vaga:', e)
    return NextResponse.json({ error: 'Erro interno ao excluir' }, { status: 500 })
  }
}
