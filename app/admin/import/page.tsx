'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ImportPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [results, setResults] = useState<{
    success: boolean
    message: string
    stats?: {
      products: number
      options: number
      categories: number
    }
  } | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResults(null)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setResults(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setResults(data)
      setFile(null)

      // Reset file input
      const input = document.getElementById('file-input') as HTMLInputElement
      if (input) input.value = ''

      // Refresh after successful import
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setResults({
        success: false,
        message: error.message || 'שגיאה בייבוא הקובץ'
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        ייבוא מוצרים מ-CSV
      </h1>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">פורמט הקובץ</h2>
        <p className="text-gray-600 mb-4">
          הקובץ צריך להיות בפורמט CSV עם העמודות הבאות:
        </p>
        <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
          category,name,unit_label,base_price,notes,options
        </div>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>• <strong>category</strong>: שם הקטגוריה (למשל: &quot;כריכונים&quot;)</li>
          <li>• <strong>name</strong>: שם המוצר</li>
          <li>• <strong>unit_label</strong>: יחידת מידה (למשל: &quot;16 יח׳&quot; או &quot;מגש&quot;)</li>
          <li>• <strong>base_price</strong>: מחיר בסיס (מספר)</li>
          <li>• <strong>notes</strong>: הערות (אופציונלי)</li>
          <li>• <strong>options</strong>: אפשרויות מופרדות ב-| (למשל: &quot;גאודה | סלמון | סלמון (+42)&quot;)</li>
        </ul>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">הערות חשובות:</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>• תוספות מחיר מסומנות בסוגריים, למשל: (+42)</li>
            <li>• שילוב סוגים מזוהה אוטומטית מההערות (&quot;ניתן לשלב 2 סוגים&quot;)</li>
            <li>• קטגוריות חדשות ייווצרו אוטומטית</li>
            <li>• מוצרים קיימים עם אותו שם יתעדכנו</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">העלה קובץ CSV</h2>

        <div className="space-y-4">
          <div>
            <input
              id="file-input"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {file && (
            <div className="flex items-center gap-4">
              <div className="flex-1 text-sm text-gray-600">
                קובץ נבחר: {file.name}
              </div>
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isUploading ? 'מייבא...' : 'ייבא מוצרים'}
              </button>
            </div>
          )}
        </div>

        {results && (
          <div className={`mt-6 p-4 rounded-md ${results.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className={`font-semibold ${results.success ? 'text-green-800' : 'text-red-800'}`}>
              {results.success ? '✓ הייבוא הושלם בהצלחה!' : '✗ הייבוא נכשל'}
            </div>
            <div className={`text-sm mt-2 ${results.success ? 'text-green-700' : 'text-red-700'}`}>
              {results.message}
            </div>
            {results.stats && (
              <div className="mt-3 text-sm text-green-700">
                <div>• {results.stats.products} מוצרים</div>
                <div>• {results.stats.options} אפשרויות</div>
                <div>• {results.stats.categories} קטגוריות</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/admin')}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          חזור לרשימת המוצרים
        </button>
      </div>
    </div>
  )
}
