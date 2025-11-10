import { prisma } from '@/lib/prisma'
import CategoryManagement from '@/components/CategoryManagement'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { display_order: 'asc' },
    include: {
      _count: {
        select: { Product: true }
      }
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        ניהול קטגוריות
      </h1>

      <CategoryManagement initialCategories={categories} />
    </div>
  )
}
