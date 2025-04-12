import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true }
    })

    if (!user) {
      return NextResponse.json({ exists: false })
    }

    const provider = user.accounts[0]?.provider ?? null

    return NextResponse.json({ exists: true, provider })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}