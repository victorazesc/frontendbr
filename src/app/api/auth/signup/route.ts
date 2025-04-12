// src/app/api/auth/signup/route.ts

import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email e senha obrigatórios' }, { status: 400 })
  }

  const userExists = await prisma.user.findUnique({ where: { email } })
  if (userExists) {
    return NextResponse.json({ error: 'Usuário já existe' }, { status: 409 })
  }

  const hashedPassword = await hash(password, 10)

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ success: true })
}