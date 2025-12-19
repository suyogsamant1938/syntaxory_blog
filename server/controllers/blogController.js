import supabase from '../config/supabase.js';

// Controller functions for blog CRUD
// Use Supabase queries
// Enforce ownership checks

export const listBlogs = async (req, res) => {
	try {
		const { data, error } = await supabase
			.from('blogs')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) return res.status(500).json({ error: error.message });
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const getBlog = async (req, res) => {
	const { id } = req.params;
	try {
		const { data, error } = await supabase.from('blogs').select('*').eq('id', id).single();
		if (error) return res.status(404).json({ error: error.message });
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const createBlog = async (req, res) => {
	const { title, content } = req.body;
	const author_id = req.user?.id;
	try {
		const { data, error } = await supabase
			.from('blogs')
			.insert([{ title, content, author_id }])
			.select()
			.single();

		if (error) return res.status(400).json({ error: error.message });
		res.status(201).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const updateBlog = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	const userId = req.user?.id;
	try {
		const { data: existing, error: getErr } = await supabase
			.from('blogs')
			.select('author_id')
			.eq('id', id)
			.single();

		if (getErr) return res.status(404).json({ error: getErr.message });
		if (existing.author_id !== userId) return res.status(403).json({ error: 'Not authorized' });

		const { data, error } = await supabase
			.from('blogs')
			.update({ title, content })
			.eq('id', id)
			.select()
			.single();

		if (error) return res.status(400).json({ error: error.message });
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export const deleteBlog = async (req, res) => {
	const { id } = req.params;
	const userId = req.user?.id;
	try {
		const { data: existing, error: getErr } = await supabase
			.from('blogs')
			.select('author_id')
			.eq('id', id)
			.single();

		if (getErr) return res.status(404).json({ error: getErr.message });
		if (existing.author_id !== userId) return res.status(403).json({ error: 'Not authorized' });

		const { error } = await supabase.from('blogs').delete().eq('id', id);
		if (error) return res.status(400).json({ error: error.message });
		res.status(204).send();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
