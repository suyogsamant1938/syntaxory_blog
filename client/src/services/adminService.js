import { supabase } from '../lib/supabase';

const adminService = {
  // Get dashboard statistics
  getStats: async () => {
    try {
      // Get total blogs count
      const { count: blogsCount } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

      // Get total users count
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get total likes count
      const { count: likesCount } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true });

      // Get total views (you might need to add a views table or use a different metric)
      // For now, using a placeholder
      const totalViews = blogsCount * 100; // Placeholder calculation

      return {
        totalBlogs: blogsCount || 0,
        totalUsers: usersCount || 0,
        totalLikes: likesCount || 0,
        totalViews: totalViews || 0,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Get recent blogs
  getRecentBlogs: async (limit = 5) => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get recent users
  getRecentUsers: async (limit = 5) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get all users
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update user role
  updateUserRole: async (userId, newRole) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);

    if (error) throw error;
  },
};

export default adminService;
