'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name_he: string
  slug: string
  display_order: number
  _count: {
    Product: number
  }
}

interface CategoryManagementProps {
  initialCategories: Category[]
}

export default function CategoryManagement({ initialCategories }: CategoryManagementProps) {
  const router = useRouter()
  const [categories, setCategories] = useState(initialCategories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name_he: '', slug: '', display_order: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState({ name_he: '', slug: '', display_order: 0 })

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setEditForm({
      name_he: category.name_he,
      slug: category.slug,
      display_order: category.display_order
    })
    setError('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ name_he: '', slug: '', display_order: 0 })
    setError('')
  }

  const handleSaveEdit = async (id: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update category')
      }

      // Update local state
      setCategories(categories.map(cat =>
        cat.id === id ? { ...cat, ...editForm } : cat
      ))
      setEditingId(null)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update category')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, productCount: number) => {
    if (productCount > 0) {
      setError('לא ניתן למחוק קטגוריה עם מוצרים. אנא הסר את כל המוצרים תחילה.')
      return
    }

    if (!confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete category')
      }

      // Remove from local state
      setCategories(categories.filter(cat => cat.id !== id))
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!addForm.name_he || !addForm.slug) {
      setError('שם וסלאג הם שדות חובה')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create category')
      }

      // Add to local state
      setCategories([...categories, data.category])
      setAddForm({ name_he: '', slug: '', display_order: 0 })
      setShowAddForm(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAdd = () => {
    setAddForm({ name_he: '', slug: '', display_order: 0 })
    setShowAddForm(false)
    setError('')
  }

  return (
    <div>
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Add Category Button */}
      <div className="mb-6">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            + הוסף קטגוריה חדשה
          </button>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">קטגוריה חדשה</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  שם הקטגוריה <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.name_he}
                  onChange={(e) => setAddForm({ ...addForm, name_he: e.target.value })}
                  placeholder="לדוגמה: כריכים"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (באנגלית) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addForm.slug}
                  onChange={(e) => setAddForm({ ...addForm, slug: e.target.value })}
                  placeholder="sandwiches"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  סדר תצוגה
                </label>
                <input
                  type="number"
                  value={addForm.display_order}
                  onChange={(e) => setAddForm({ ...addForm, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'שומר...' : 'שמור קטגוריה'}
              </button>
              <button
                onClick={handleCancelAdd}
                disabled={loading}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50"
              >
                ביטול
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם הקטגוריה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מספר מוצרים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סדר תצוגה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                {editingId === category.id ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={editForm.name_he}
                        onChange={(e) => setEditForm({ ...editForm, name_he: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        disabled={loading}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={editForm.slug}
                        onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        disabled={loading}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {category._count.Product} מוצרים
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={editForm.display_order}
                        onChange={(e) => setEditForm({ ...editForm, display_order: parseInt(e.target.value) })}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        disabled={loading}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(category.id)}
                          disabled={loading}
                          className="text-green-600 hover:text-green-900 font-medium disabled:opacity-50"
                        >
                          שמור
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="text-gray-600 hover:text-gray-900 font-medium disabled:opacity-50"
                        >
                          ביטול
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.name_he}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {category._count.Product} מוצרים
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {category.display_order}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          disabled={loading}
                          className="text-blue-600 hover:text-blue-900 font-medium disabled:opacity-50"
                        >
                          ערוך
                        </button>
                        <button
                          onClick={() => handleDelete(category.id, category._count.Product)}
                          disabled={loading || category._count.Product > 0}
                          className="text-red-600 hover:text-red-900 font-medium disabled:opacity-30 disabled:cursor-not-allowed"
                          title={category._count.Product > 0 ? 'לא ניתן למחוק קטגוריה עם מוצרים' : 'מחק קטגוריה'}
                        >
                          מחק
                        </button>
                      </div>
                    </td>
                  </>
                )}
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
