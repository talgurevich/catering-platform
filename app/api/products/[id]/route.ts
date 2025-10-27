import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const body = await request.json()

    // Extract options from body
    const { options, ...productData } = body

    // Update product
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...productData,
        updated_at: new Date(),
      }
    })

    // Delete existing options and create new ones
    if (options) {
      await prisma.productOption.deleteMany({
        where: { product_id: product.id }
      })

      if (options.length > 0) {
        await prisma.productOption.createMany({
          data: options.map((opt: any, index: number) => ({
            product_id: product.id,
            option_name: opt.option_name,
            price_modifier: opt.price_modifier || 0,
            display_order: index,
          }))
        })
      }
    }

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}
