import { prisma } from '@/lib/prisma'

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { display_order: 'asc' },
    include: {
      _count: {
        select: { products: true }
      }
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        ניהול קטגוריות
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם הקטגוריה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מספר מוצרים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סדר תצוגה
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {category.name_he}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {category._count.products} מוצרים
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {category.display_order}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            אין קטגוריות עדיין
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        סה"כ {categories.length} קטגוריות
      </div>
    </div>
  )
}
