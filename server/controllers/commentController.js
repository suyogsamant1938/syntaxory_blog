import supabase from '../config/supabase.js';

// Add comment
export const addComment = async (req, res) => {
	const blogId = req.params.id;
	const userId = req.user?.id;
	const { comment } = req.body;

	if (!userId) return res.status(401).json({ error: 'Unauthorized' });
	if (!blogId || !comment) return res.status(400).json({ error: 'Missing blog id or comment' });

	try {
		const { data, error } = await supabase
			.from('comments')
			.insert([{ blog_id: blogId, user_id: userId, comment }])
			.select()
			.single();

		if (error) return res.status(400).json({ error: error.message });

		res.status(201).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

// Fetch comments for a blog with pagination
export const getComments = async (req, res) => {
	const blogId = req.params.id;
	const page = Math.max(parseInt(req.query.page) || 1, 1);
	const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);

	if (!blogId) return res.status(400).json({ error: 'Missing blog id' });

	const from = (page - 1) * limit;
	const to = from + limit - 1;

	try {
		const { data, error, count } = await supabase
			.from('comments')
			.select('id, comment, user_id, created_at', { count: 'exact' })
			.eq('blog_id', blogId)
			.order('created_at', { ascending: false })
			.range(from, to);

		if (error) return res.status(400).json({ error: error.message });

		res.status(200).json({ data, count: count || 0, page, limit });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default { addComment, getComments };
