'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ProductOption {
  option_name: string
  price_modifier: number
}

interface Category {
  id: string
  name_he: string
}

interface ProductFormProps {
  categories: Category[]
  initialData?: {
    id?: string
    name_he: string
    description_he?: string
    price: number
    category_id: string
    unit_label: string
    prep_time_days: number
    notes?: string
    max_options_select: number
    is_active: boolean
    product_options?: ProductOption[]
  }
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name_he: initialData?.name_he || '',
    description_he: initialData?.description_he || '',
    price: initialData?.price || 0,
    category_id: initialData?.category_id || categories[0]?.id || '',
    unit_label: initialData?.unit_label || '',
    prep_time_days: initialData?.prep_time_days || 2,
    notes: initialData?.notes || '',
    max_options_select: initialData?.max_options_select || 1,
    is_active: initialData?.is_active ?? true,
  })

  const [options, setOptions] = useState<ProductOption[]>(
    initialData?.product_options || []
  )

  const addOption = () => {
    setOptions([...options, { option_name: '', price_modifier: 0 }])
  }

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const updateOption = (index: number, field: keyof ProductOption, value: string | number) => {
    const newOptions = [...options]
    newOptions[index] = { ...newOptions[index], [field]: value }
    setOptions(newOptions)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        prep_time_days: Number(formData.prep_time_days),
        max_options_select: Number(formData.max_options_select),
        slug: `${formData.name_he}-${Date.now()}`,
        options: options.filter(opt => opt.option_name.trim() !== ''),
      }

      const url = initialData?.id
        ? `/api/products/${initialData.id}`
        : '/api/products'

      const method = initialData?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to save product')
      }

      router.push('/admin')
      router.refresh()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('שגיאה בשמירת המוצר')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">פרטי מוצר</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם המוצר *
            </label>
            <input
              type="text"
              required
              value={formData.name_he}
              onChange={(e) => setFormData({ ...formData, name_he: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              קטגוריה *
            </label>
            <select
              required
              value={formData.category_id}
              onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_he}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מחיר בסיס (₪) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              יחידת מידה *
            </label>
            <input
              type="text"
              required
              placeholder='למשל: "16 יח׳" או "מגש"'
              value={formData.unit_label}
              onChange={(e) => setFormData({ ...formData, unit_label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              זמן הכנה (ימים) *
            </label>
            <input
              type="number"
              required
              value={formData.prep_time_days}
              onChange={(e) => setFormData({ ...formData, prep_time_days: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מקסימום אפשרויות לבחירה
            </label>
            <input
              type="number"
              min="1"
              value={formData.max_options_select}
              onChange={(e) => setFormData({ ...formData, max_options_select: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              כמה אפשרויות הלקוח יכול לבחור (למשל: 2 לשילוב סוגים)
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            תיאור
          </label>
          <textarea
            rows={3}
            value={formData.description_he}
            onChange={(e) => setFormData({ ...formData, description_he: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            הערות
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder='למשל: "ניתן לשלב 2 סוגים במגש"'
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="mr-2 text-sm font-medium text-gray-700">
              מוצר פעיל
            </span>
          </label>
        </div>
      </div>

      {/* Product Options */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">אפשרויות מוצר</h2>
          <button
            type="button"
            onClick={addOption}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            + הוסף אפשרות
          </button>
        </div>

        {options.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            אין אפשרויות. לחץ על &quot;הוסף אפשרות&quot; להוספת אפשרות למוצר.
          </p>
        ) : (
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="שם האפשרות (למשל: גאודה, סלמון)"
                    value={option.option_name}
                    onChange={(e) => updateOption(index, 'option_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="תוספת מחיר"
                    value={option.price_modifier}
                    onChange={(e) => updateOption(index, 'price_modifier', parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  מחק
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit buttons */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ביטול
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'שומר...' : initialData?.id ? 'עדכן מוצר' : 'צור מוצר'}
        </button>
      </div>
    </form>
  )
}
