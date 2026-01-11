-- 1. Create the bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update
set public = true;

-- 2. Allow public access to read images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'blog-images' );

-- 3. Allow authenticated users to upload images
create policy "Authenticated users can upload images"
on storage.objects for insert
with check (
  bucket_id = 'blog-images' 
  and auth.role() = 'authenticated'
);

-- 4. Allow users to update/delete their own images
create policy "Users can update their own images"
on storage.objects for update
using ( bucket_id = 'blog-images' and auth.uid() = owner );

create policy "Users can delete their own images"
on storage.objects for delete
using ( bucket_id = 'blog-images' and auth.uid() = owner );
