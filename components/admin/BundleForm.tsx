'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BundleFormProps {
  initialData?: {
    id?: string
    name_he: string
    short_description?: string
    full_description: string
    price: number
    serves_people?: number
    image_url?: string
    is_active: boolean
    is_featured: boolean
    display_order: number
    prep_time_days: number
    notes?: string
  }
}

export default function BundleForm({ initialData }: BundleFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')

  const [formData, setFormData] = useState({
    name_he: initialData?.name_he || '',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || '',
    price: initialData?.price || 0,
    serves_people: initialData?.serves_people || 20,
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
    display_order: initialData?.display_order || 0,
    prep_time_days: initialData?.prep_time_days || 2,
    notes: initialData?.notes || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        serves_people: Number(formData.serves_people) || null,
        display_order: Number(formData.display_order),
        prep_time_days: Number(formData.prep_time_days),
        ...(initialData?.id ? {} : { slug: `${formData.name_he}-${Date.now()}` }),
        image_url: imageUrl || null,
        included_items: [],
        optional_extras: [],
      }

      const url = initialData?.id
        ? `/api/bundles/${initialData.id}`
        : '/api/bundles'

      const method = initialData?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        throw new Error(errorData.details || errorData.error || 'Failed to save bundle')
      }

      router.push('/admin/bundles')
      router.refresh()
    } catch (error) {
      console.error('Error saving bundle:', error)
      const message = error instanceof Error ? error.message : 'שגיאה לא ידועה'
      alert(`שגיאה בשמירת החבילה: ${message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">פרטי חבילה</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              שם החבילה *
            </label>
            <input
              type="text"
              required
              value={formData.name_he}
              onChange={(e) => setFormData({ ...formData, name_he: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מחיר (₪) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              מספר אנשים
            </label>
            <input
              type="number"
              value={formData.serves_people}
              onChange={(e) => setFormData({ ...formData, serves_people: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              סדר תצוגה
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <p className="text-sm text-gray-500 mt-1">
              מספר נמוך יופיע ראשון
            </p>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            תיאור קצר
          </label>
          <textarea
            rows={2}
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="תיאור קצר לכרטיס החבילה"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            תיאור מלא *
          </label>
          <textarea
            rows={6}
            required
            value={formData.full_description}
            onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
            placeholder="תיאור מפורט של החבילה ומה כולל"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
            placeholder="הערות פנימיות"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            כתובת URL לתמונה
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          <p className="text-sm text-gray-500 mt-1">
            העלה תמונה לאחסון (Supabase/Cloudinary) והדבק את הקישור כאן
          </p>
        </div>

        <div className="mt-6 flex items-center gap-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="mr-2 text-sm font-medium text-gray-700">
              חבילה פעילה
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="mr-2 text-sm font-medium text-gray-700">
              חבילה מומלצת
            </span>
          </label>
        </div>
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
          {isSubmitting ? 'שומר...' : initialData?.id ? 'עדכן חבילה' : 'צור חבילה'}
        </button>
      </div>
    </form>
  )
}
