import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// GET all bundles (public - for events page)
export async function GET() {
  try {
    const bundles = await prisma.bundle.findMany({
      where: { is_active: true },
      orderBy: [
        { display_order: 'asc' },
        { created_at: 'desc' }
      ]
    })

    return NextResponse.json({ bundles })
  } catch (error) {
    console.error('Error fetching bundles:', error)
    return NextResponse.json({ error: 'Failed to fetch bundles' }, { status: 500 })
  }
}

// POST create new bundle (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    const bundle = await prisma.bundle.create({
      data: {
        ...body,
        id: crypto.randomUUID(),
        updated_at: new Date(),
      }
    })

    return NextResponse.json({ success: true, bundle })
  } catch (error) {
    console.error('Error creating bundle:', error)
    return NextResponse.json({
      error: 'Failed to create bundle',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
