import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import Papa from 'papaparse'

const prisma = new PrismaClient()

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

async function importCatalog() {
  console.log('🚀 Starting catalog import...\n')

  // Read CSV file
  const csvPath = path.join(process.cwd(), 'bread_station_catalog.csv')
  const csvContent = fs.readFileSync(csvPath, 'utf-8')

  // Parse CSV
  const { data } = Papa.parse<CSVRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  })

  console.log(`📊 Found ${data.length} products in CSV\n`)

  // Track categories
  const categoryMap = new Map<string, string>()
  let categoryOrder = 0

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
      console.log(`✅ Category: ${categoryName}`)
    }
  }

  console.log(`\n📁 Created ${categoryMap.size} categories\n`)

  // Import products
  let productCount = 0
  let optionCount = 0

  for (const row of data) {
    const categoryId = categoryMap.get(row.category.trim())!
    const productName = row.name.trim()
    const productSlug = slugify(productName + '-' + productCount)
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

    console.log(`  ✅ Product: ${productName} (₪${basePrice})`)
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

      if (priceModifier !== 0) {
        console.log(`    → Option: ${optionName} (+₪${priceModifier})`)
      } else {
        console.log(`    → Option: ${optionName}`)
      }
    }
  }

  console.log(`\n🎉 Import complete!`)
  console.log(`   📦 Products: ${productCount}`)
  console.log(`   🏷️  Options: ${optionCount}`)
  console.log(`   📁 Categories: ${categoryMap.size}\n`)
}

importCatalog()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
