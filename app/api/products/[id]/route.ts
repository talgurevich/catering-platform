import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        ProductOption: {
          orderBy: { display_order: 'asc' }
        }
      }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

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
    console.log('Updating product:', params.id, 'with options:', body.options)

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
    if (options !== undefined) {
      console.log('Deleting existing options for product:', product.id)
      await prisma.productOption.deleteMany({
        where: { product_id: product.id }
      })

      if (options.length > 0) {
        console.log('Creating new options:', options)
        await prisma.productOption.createMany({
          data: options.map((opt: any, index: number) => ({
            id: crypto.randomUUID(),
            product_id: product.id,
            option_name: opt.option_name,
            price_modifier: opt.price_modifier || 0,
            display_order: index,
          }))
        })
        console.log('Options created successfully')
      }
    }

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json({
      error: 'Failed to update product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
