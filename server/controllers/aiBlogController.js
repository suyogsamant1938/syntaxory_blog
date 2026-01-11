import supabase from '../config/supabase.js';
import { generateBlogContent } from '../services/geminiService.js';

// Handler: generate blog using Gemini, parse title & content, save to DB
export const generateAIBlog = async (req, res) => {
	const { topic, style } = req.body || {};
	if (!topic) return res.status(400).json({ error: 'Missing required field: topic' });

	try {
		const markdown = await generateBlogContent(topic, style);

		// Parse title: prefer first H1 ('# Title'), then 'Title:' line, else first non-empty line
		let title = '';
		let content = (markdown || '').toString();

		const h1 = content.match(/^#\s*(.+)$/m);
		if (h1) {
			title = h1[1].trim();
			content = content.replace(h1[0], '').trim();
		} else {
			const tline = content.match(/^Title:\s*(.+)$/im);
			if (tline) {
				title = tline[1].trim();
				content = content.replace(tline[0], '').trim();
			} else {
				const firstLine = content.split(/\r?\n/).find(l => l.trim());
				title = (firstLine || 'AI Generated Post').trim().slice(0, 200);
			}
		}

		const author_id = req.user?.id || null;

		res.status(200).json({ title, content });
	} catch (err) {
		console.error('AI blog generation error:', err);
		res.status(500).json({ error: err.message });
	}
};