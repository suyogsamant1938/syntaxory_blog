-- Add image_url and category columns to blogs table
alter table blogs 
add column if not exists image_url text,
add column if not exists category text;
