'use client'

import { useQuery } from '@tanstack/react-query'
import ProductForm from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

interface Category {
  id: string
  name_he: string
}

interface ProductOption {
  option_name: string
  price_modifier: number
}

interface Product {
  id: string
  name_he: string
  description_he: string | null
  price: number
  category_id: string
  unit_label: string
  prep_time_days: number
  notes: string | null
  max_options_select: number
  is_active: boolean
  image_url: string | null
  ProductOption: Array<{
    option_name: string
    price_modifier: number
  }>
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) throw new Error('Failed to fetch categories')
      const data = await response.json()
      return data.categories as Category[]
    },
  })

  const { data: productData, isLoading: productLoading, error: productError } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${params.id}`)
      if (!response.ok) {
        if (response.status === 404) throw new Error('NOT_FOUND')
        throw new Error('Failed to fetch product')
      }
      const data = await response.json()
      return data.product as Product
    },
  })

  if (productError?.message === 'NOT_FOUND') {
    notFound()
  }

  if (categoriesLoading || productLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          עריכת מוצר
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

  if (productError || !productData || !categoriesData) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          עריכת מוצר
        </h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          שגיאה בטעינת המוצר. נסה לרענן את הדף.
        </div>
      </div>
    )
  }

  const initialData = {
    id: productData.id,
    name_he: productData.name_he,
    description_he: productData.description_he || '',
    price: Number(productData.price),
    category_id: productData.category_id,
    unit_label: productData.unit_label,
    prep_time_days: productData.prep_time_days,
    notes: productData.notes || '',
    max_options_select: productData.max_options_select,
    is_active: productData.is_active,
    image_url: productData.image_url || '',
    product_options: productData.ProductOption.map(opt => ({
      option_name: opt.option_name,
      price_modifier: Number(opt.price_modifier),
    })),
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        עריכת מוצר: {productData.name_he}
      </h1>

      <ProductForm categories={categoriesData} initialData={initialData} />
    </div>
  )
}
