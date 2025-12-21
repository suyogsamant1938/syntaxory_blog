# API Reference

All responses use JSON unless otherwise noted. Error responses: { "error": "<message>" }.

## POST /stripe/checkout
- Method: POST
- Headers: `Authorization: Bearer <supabase_jwt>`, `Content-Type: application/json`
- Request body: none
- Success (201):
	```json
	{ "url": "https://checkout.stripe.com/...", "id": "cs_test_..." }
	```

## POST /webhook
- Method: POST
- Headers: `Stripe-Signature: <signature>` (required)
- Content-Type: application/json (endpoint expects raw body for signature verification)
- Request body: raw Stripe event JSON
- Success (200): `{ "received": true }`

## POST /likes/:id/like
- Method: POST
- Path params: `:id` = `blog_id`
- Headers: `Authorization: Bearer <supabase_jwt>`
- Request body: none
- Success (200):
	```json
	{ "message": "Liked", "data": [ /* upserted row(s) */ ] }
	```

## DELETE /likes/:id/like
- Method: DELETE
- Path params: `:id` = `blog_id`
- Headers: `Authorization: Bearer <supabase_jwt>`
- Request body: none
- Success (204): No content

## GET /likes/:id/likes
- Method: GET
- Path params: `:id` = `blog_id`
- Headers: none
- Request body: none
- Success (200):
	```json
	{ "count": 123 }
	```

## POST /comments/:id/comments
- Method: POST
- Path params: `:id` = `blog_id`
- Headers: `Authorization: Bearer <supabase_jwt>`, `Content-Type: application/json`
- Request body:
	```json
	{ "comment": "Nice post!" }
	```
- Success (201): inserted comment object e.g.
	```json
	{
		"id": "...",
		"blog_id": "...",
		"user_id": "...",
		"comment": "Nice post!",
		"created_at": "2025-12-20T12:34:56.789Z"
	}
	```

## GET /comments/:id/comments
- Method: GET
- Path params: `:id` = `blog_id`
- Query params: `page` (int, default 1), `limit` (int, default 10, max 100)
- Headers: none
- Request body: none
- Success (200):
	```json
	{
		"data": [ { "id":"...", "comment":"...", "user_id":"...", "created_at":"..." } ],
		"count": 42,
		"page": 1,
		"limit": 10
	}
	```

## Common error shapes
- Unauthorized: `401` — `{ "error": "Invalid or expired token" }`
- Bad request: `400` — `{ "error": "<message>" }`
- Server error: `500` — `{ "error": "<message>" }`

If you want, I can add example curl commands for each endpoint.
