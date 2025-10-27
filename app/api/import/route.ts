import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import Papa from 'papaparse'

interface CSVRow {
  category: string
  name: string
  unit_label: string
  base_price: string
  notes: string
  options: string
}

function slugify(text: string): string {
  return text
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0590-\u05FFa-z0-9-]/gi, '')
    .toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!isAdmin(user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const text = await file.text()
    const { data } = Papa.parse<CSVRow>(text, {
      header: true,
      skipEmptyLines: true,
    })

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No data found in CSV' }, { status: 400 })
    }

    // Track categories
    const categoryMap = new Map<string, string>()
    let categoryOrder = 0

    // Track statistics
    let productCount = 0
    let optionCount = 0

    for (const row of data) {
      const categoryName = row.category.trim()

      // Create category if it doesn't exist
      if (!categoryMap.has(categoryName)) {
        const slug = slugify(categoryName)

        const category = await prisma.category.upsert({
          where: { slug },
          create: {
            name_he: categoryName,
            slug,
            display_order: categoryOrder++,
          },
          update: {
            name_he: categoryName,
          },
        })

        categoryMap.set(categoryName, category.id)
      }

      const categoryId = categoryMap.get(categoryName)!
      const productName = row.name.trim()
      const productSlug = slugify(productName + '-' + Date.now())
      const basePrice = parseFloat(row.base_price)

      // Parse options
      const optionsText = row.options?.trim() || ''
      const optionsList = optionsText
        ? optionsText.split('|').map(opt => opt.trim()).filter(Boolean)
        : []

      // Determine max options select from notes
      let maxOptionsSelect = 1
      if (row.notes?.includes('ניתן לשלב 2 סוגים')) {
        maxOptionsSelect = 2
      } else if (row.notes?.includes('ניתן לשלב 3 סוגים')) {
        maxOptionsSelect = 3
      }

      // Create product
      const product = await prisma.product.create({
        data: {
          name_he: productName,
          slug: productSlug,
          price: basePrice,
          unit_label: row.unit_label.trim(),
          category_id: categoryId,
          notes: row.notes?.trim() || null,
          max_options_select: maxOptionsSelect,
          prep_time_days: 2, // Default
          is_active: true,
          is_featured: false,
        },
      })

      productCount++

      // Create product options
      for (let i = 0; i < optionsList.length; i++) {
        const optionText = optionsList[i]

        // Check for price modifier (e.g., "סלמון (+42)")
        const priceModifierMatch = optionText.match(/\(([+\-]\d+)\)/)
        const priceModifier = priceModifierMatch ? parseFloat(priceModifierMatch[1]) : 0
        const optionName = optionText.replace(/\s*\([+\-]\d+\)\s*/, '').trim()

        await prisma.productOption.create({
          data: {
            product_id: product.id,
            option_name: optionName,
            price_modifier: priceModifier,
            display_order: i,
          },
        })

        optionCount++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'הייבוא הושלם בהצלחה',
      stats: {
        products: productCount,
        options: optionCount,
        categories: categoryMap.size,
      }
    })
  } catch (error: any) {
    console.error('Error importing CSV:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to import CSV' },
      { status: 500 }
    )
  }
}
