-- Seed data for local development
-- Inserts two profiles (one USER, one PAID_SUBSCRIBER) with fixed UUIDs
-- Also inserts a subscription for the paid user, one blog, an image,
-- a like from the paid user, and two comments.

-- Profiles
insert into profiles (id, email, role, created_at) values
	('11111111-1111-1111-1111-111111111111', 'user@example.com', 'USER', now()),
	('22222222-2222-2222-2222-222222222222', 'paid@example.com', 'PAID_SUBSCRIBER', now());

-- Subscriptions (paid user)
insert into subscriptions (id, user_id, stripe_subscription_id, status, start_date, end_date) values
	('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'sub_test_ABC123', 'active', now(), now() + interval '30 days');

-- Blogs
insert into blogs (id, title, content, author_id, author_type, is_published, created_at) values
	('44444444-4444-4444-4444-444444444444', 'Welcome to Syntaxory', 'This is a seeded blog post for local development.', '22222222-2222-2222-2222-222222222222', 'HUMAN', true, now());

-- Blog images
insert into blog_images (id, blog_id, image_url) values
	('55555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'https://example.com/seed-image.jpg');

-- Likes (paid user likes the seeded blog)
insert into likes (user_id, blog_id, created_at) values
	('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', now());

-- Comments
insert into comments (id, blog_id, user_id, comment, created_at) values
	('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Great post!', now()),
	('77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Thanks for reading!', now());

-- End of seed file