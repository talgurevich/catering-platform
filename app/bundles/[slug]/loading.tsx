export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mb-4"></div>
        <p className="text-xl text-gray-600">טוען...</p>
      </div>
    </div>
  )
}
