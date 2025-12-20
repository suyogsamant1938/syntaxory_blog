// Add like if not exists
// Remove like
// Get like count per blog

import supabase from '../config/supabase.js';

// Add a like for a blog by the authenticated user (idempotent)
export const likeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!blogId) return res.status(400).json({ error: 'Missing blog id' });

  try {
    // Use upsert with onConflict to make this idempotent
    const { data, error } = await supabase
      .from('likes')
      .upsert([{ user_id: userId, blog_id: blogId }], { onConflict: 'user_id,blog_id' });

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ message: 'Liked', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a like for a blog by the authenticated user
export const unlikeBlog = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  if (!blogId) return res.status(400).json({ error: 'Missing blog id' });

  try {
    const { error } = await supabase
      .from('likes')
      .delete()
      .match({ user_id: userId, blog_id: blogId });

    if (error) return res.status(400).json({ error: error.message });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get like count for a blog
export const getLikeCount = async (req, res) => {
  const blogId = req.params.id;
  if (!blogId) return res.status(400).json({ error: 'Missing blog id' });

  try {
    // Use head:true with count to avoid returning rows
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('blog_id', blogId);

    if (error) return res.status(400).json({ error: error.message });

    res.status(200).json({ count: count || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { likeBlog, unlikeBlog, getLikeCount };
