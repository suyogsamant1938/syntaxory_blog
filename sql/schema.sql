-- Enable Row Level Security on all tables
alter table profiles enable row level security;
alter table subscriptions enable row level security;
alter table blogs enable row level security;
alter table blog_images enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;

-- Profiles Table
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text default 'USER',
  created_at timestamp default now()
);

-- Subscriptions Table
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  stripe_subscription_id text unique,
  status text,
  start_date timestamp,
  end_date timestamp
);

-- Blogs Table
create table blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references profiles(id) on delete set null,
  author_type text check (author_type in ('HUMAN','AI')),
  is_published boolean default true,
  created_at timestamp default now()
);

-- Blog Images Table
create table blog_images (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid references blogs(id) on delete cascade,
  image_url text not null
);

-- Likes Table
create table likes (
  user_id uuid references profiles(id) on delete cascade,
  blog_id uuid references blogs(id) on delete cascade,
  created_at timestamp default now(),
  primary key (user_id, blog_id)
);

-- Comments Table
create table comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid references blogs(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  comment text not null,
  created_at timestamp default now()
);

-- Indexes
create index idx_blogs_created_at on blogs(created_at desc);
create index idx_blogs_author on blogs(author_id);
create index idx_comments_blog on comments(blog_id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'USER');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS Policies

-- Profiles:
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Blogs:
create policy "Blogs are viewable by everyone" on blogs for select using (is_published = true);

-- Paid users (and Admins) can insert
create policy "Paid users can insert blogs" on blogs for insert with check (
  exists (select 1 from profiles where id = auth.uid() and (role = 'PAID_SUBSCRIBER' or role = 'ADMIN'))
);

-- Authors (and Admins) can update their own blogs
create policy "Authors can update own blogs" on blogs for update using (
  auth.uid() = author_id or exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN')
);

-- Authors (and Admins) can delete their own blogs
create policy "Authors can delete own blogs" on blogs for delete using (
  auth.uid() = author_id or exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN')
);

-- Blog Images:
create policy "Images are viewable by everyone" on blog_images for select using (true);
create policy "Authors can insert images" on blog_images for insert with check (
  exists (select 1 from blogs where id = blog_id and author_id = auth.uid())
);

-- Comments:
create policy "Comments are viewable by everyone" on comments for select using (true);
create policy "Authenticated users can comment" on comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on comments for delete using (
  auth.uid() = user_id or exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN')
);

-- Likes:
create policy "Likes are viewable by everyone" on likes for select using (true);
create policy "Authenticated users can like" on likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on likes for delete using (auth.uid() = user_id);
