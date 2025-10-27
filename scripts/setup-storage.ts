import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupStorage() {
  try {
    console.log('Setting up Supabase Storage bucket for product images...')

    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error('Error listing buckets:', listError)
      process.exit(1)
    }

    const bucketExists = buckets.some(bucket => bucket.name === 'product-images')

    if (bucketExists) {
      console.log('✓ Bucket "product-images" already exists')
    } else {
      // Create bucket
      const { data, error } = await supabase.storage.createBucket('product-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      })

      if (error) {
        console.error('Error creating bucket:', error)
        process.exit(1)
      }

      console.log('✓ Created bucket "product-images"')
    }

    // Set up storage policies for public access
    console.log('\nStorage bucket setup complete!')
    console.log('\nNext steps:')
    console.log('1. Go to Supabase Dashboard > Storage > product-images')
    console.log('2. Under "Policies", ensure public access is enabled for:')
    console.log('   - SELECT (read): Allow public to view images')
    console.log('   - INSERT (upload): Allow authenticated users to upload')
    console.log('   - DELETE: Allow authenticated users to delete their uploads')

  } catch (error) {
    console.error('Unexpected error:', error)
    process.exit(1)
  }
}

setupStorage()
