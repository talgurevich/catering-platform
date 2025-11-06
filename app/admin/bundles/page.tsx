import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminBundlesPage() {
  const bundles = await prisma.bundle.findMany({
    orderBy: [
      { display_order: 'asc' },
      { created_at: 'desc' }
    ]
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          ניהול חבילות
        </h1>
        <Link
          href="/admin/bundles/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          + חבילה חדשה
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                שם החבילה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מחיר
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                מספר אנשים
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סדר תצוגה
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                סטטוס
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                פעולות
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bundles.map((bundle) => (
              <tr key={bundle.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {bundle.name_he}
                  </div>
                  {bundle.short_description && (
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {bundle.short_description}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  ₪{bundle.price.toString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {bundle.serves_people ? `${bundle.serves_people} אנשים` : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {bundle.display_order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {bundle.is_active ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        פעיל
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        לא פעיל
                      </span>
                    )}
                    {bundle.is_featured && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        ⭐ מומלץ
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse">
                  <Link
                    href={`/admin/bundles/${bundle.id}/edit`}
                    className="text-blue-600 hover:text-blue-900 ml-4"
                  >
                    ערוך
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bundles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            אין חבילות עדיין. הוסף חבילה חדשה להתחיל
          </div>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        סה"כ {bundles.length} חבילות
      </div>
    </div>
  )
}
