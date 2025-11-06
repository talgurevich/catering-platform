'use client'

import { useQuery } from '@tanstack/react-query'
import ProductForm from '@/components/admin/ProductForm'

interface Category {
  id: string
  name_he: string
}

export default function NewProductPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      const data = await response.json()
      return data.categories as Category[]
    },
  })

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          מוצר חדש
        </h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          מוצר חדש
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          שגיאה בטעינת הקטגוריות. נסה לרענן את הדף.
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        מוצר חדש
      </h1>

      <ProductForm categories={data} />
    </div>
  )
}
