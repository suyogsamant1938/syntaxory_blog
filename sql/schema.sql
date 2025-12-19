create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text default 'USER',
  created_at timestamp default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  stripe_subscription_id text unique,
  status text,
  start_date timestamp,
  end_date timestamp
);

create table blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references profiles(id),
  author_type text check (author_type in ('HUMAN','AI')),
  is_published boolean default true,
  created_at timestamp default now()
);

create table blog_images (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid references blogs(id) on delete cascade,
  image_url text not null
);

create table likes (
  user_id uuid references profiles(id),
  blog_id uuid references blogs(id) on delete cascade,
  created_at timestamp default now(),
  primary key (user_id, blog_id)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  blog_id uuid references blogs(id) on delete cascade,
  user_id uuid references profiles(id),
  comment text not null,
  created_at timestamp default now()
);

create index idx_blogs_created_at on blogs(created_at desc);
create index idx_blogs_author on blogs(author_id);
create index idx_comments_blog on comments(blog_id);

alter table blogs enable row level security;

create policy "Paid users can insert blogs"
on blogs for insert
with check (
  exists (
    select 1 from profiles
    where profiles.id = auth.uid()
    and profiles.role = 'PAID_SUBSCRIBER'
  )
);
