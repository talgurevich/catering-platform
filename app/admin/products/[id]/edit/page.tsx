import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: {
        ProductOption: {
          orderBy: { display_order: 'asc' }
        }
      }
    }),
    prisma.category.findMany({
      orderBy: { display_order: 'asc' }
    })
  ])

  if (!product) {
    notFound()
  }

  const initialData = {
    id: product.id,
    name_he: product.name_he,
    description_he: product.description_he || '',
    price: Number(product.price),
    category_id: product.category_id,
    unit_label: product.unit_label,
    prep_time_days: product.prep_time_days,
    notes: product.notes || '',
    max_options_select: product.max_options_select,
    is_active: product.is_active,
    product_options: product.ProductOption.map(opt => ({
      option_name: opt.option_name,
      price_modifier: Number(opt.price_modifier),
    })),
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        עריכת מוצר: {product.name_he}
      </h1>

      <ProductForm categories={categories} initialData={initialData} />
    </div>
  )
}
