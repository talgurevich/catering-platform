import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { display_order: 'asc' }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        מוצר חדש
      </h1>

      <ProductForm categories={categories} />
    </div>
  )
}
