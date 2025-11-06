import { prisma } from '@/lib/prisma'
import BundleForm from '@/components/admin/BundleForm'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditBundlePage({ params }: { params: { id: string } }) {
  const bundle = await prisma.bundle.findUnique({
    where: { id: params.id }
  })

  if (!bundle) {
    notFound()
  }

  const initialData = {
    id: bundle.id,
    name_he: bundle.name_he,
    short_description: bundle.short_description || '',
    full_description: bundle.full_description,
    price: Number(bundle.price),
    serves_people: bundle.serves_people || undefined,
    image_url: bundle.image_url || '',
    is_active: bundle.is_active,
    is_featured: bundle.is_featured,
    display_order: bundle.display_order,
    prep_time_days: bundle.prep_time_days,
    notes: bundle.notes || '',
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        עריכת חבילה: {bundle.name_he}
      </h1>

      <BundleForm initialData={initialData} />
    </div>
  )
}
