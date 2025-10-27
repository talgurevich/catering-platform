# Supabase Storage Setup

This document explains how to set up the Supabase Storage bucket for product images.

## Manual Setup via Supabase Dashboard

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/hfbxlrlbqdigpszxqsee

2. Navigate to **Storage** in the left sidebar

3. Click **"New bucket"**

4. Configure the bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✓ Enabled
   - **File size limit**: 5MB (5242880 bytes)
   - **Allowed MIME types**: image/jpeg, image/jpg, image/png, image/webp

5. Click **"Create bucket"**

6. Set up Storage Policies:
   - Click on the `product-images` bucket
   - Go to **"Policies"** tab
   - Add the following policies:

   ### Public Read Access (Allow anyone to view images)
   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'product-images' );
   ```

   ### Authenticated Upload (Allow authenticated users to upload)
   ```sql
   CREATE POLICY "Authenticated Upload"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK ( bucket_id = 'product-images' );
   ```

   ### Authenticated Delete (Allow authenticated users to delete)
   ```sql
   CREATE POLICY "Authenticated Delete"
   ON storage.objects FOR DELETE
   TO authenticated
   USING ( bucket_id = 'product-images' );
   ```

## Testing the Upload

1. Log in to the admin dashboard at http://localhost:3000/admin
2. Create a new product or edit an existing one
3. Upload an image in the "תמונת מוצר" section
4. The image should upload successfully and display in the form
5. After saving, the image should appear in the products list

## Troubleshooting

### Upload fails with "Failed to upload file"
- Check that the `product-images` bucket exists
- Verify that the bucket is set to public
- Check the browser console for detailed error messages
- Ensure your Supabase environment variables are correct in `.env.local`

### Images don't display after upload
- Check that the storage policies are set up correctly
- Verify the image URL in the database (should start with your Supabase URL)
- Check browser console for CORS or loading errors

### "Unauthorized" error
- Make sure you're logged in as an admin user
- Check that your session is valid (try logging out and back in)
