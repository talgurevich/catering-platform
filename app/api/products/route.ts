import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    // Extract options from body
    const { options, ...productData } = body

    // Create product
    const product = await prisma.product.create({
      data: productData
    })

    // Create options if provided
    if (options && options.length > 0) {
      await prisma.productOption.createMany({
        data: options.map((opt: any, index: number) => ({
          id: crypto.randomUUID(),
          product_id: product.id,
          option_name: opt.option_name,
          price_modifier: opt.price_modifier || 0,
          display_order: index,
        }))
      })
    }

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
