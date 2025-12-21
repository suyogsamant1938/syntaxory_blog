import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import likeService from '../../services/likeService';
import './LikeButton.css';

const LikeButton = ({ blogId, initialLikes = 0, initialIsLiked = false }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    // If we didn't get initial state, we could fetch it here
    // But for now we rely on the parent or initial props
    // Ideally, we should check if the current user liked this blog
    if (isAuthenticated && blogId) {
      checkLikeStatus();
    }
  }, [blogId, isAuthenticated]);

  const checkLikeStatus = async () => {
    try {
      // The API should ideally return if the user liked it
      // For now, we might need a specific endpoint or rely on the blog details
      const { count, userLiked } = await likeService.getLikesCount(blogId);
      setLikes(count);
      if (userLiked !== undefined) setIsLiked(userLiked);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  };

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      addToast('Please login to like posts!', 'info');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    // Optimistic update
    const previousLikes = likes;
    const previousIsLiked = isLiked;

    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);

    try {
      if (isLiked) {
        await likeService.unlikeBlog(blogId);
      } else {
        await likeService.likeBlog(blogId);
      }
    } catch (error) {
      // Revert on error
      setLikes(previousLikes);
      setIsLiked(previousIsLiked);
      console.error('Error toggling like:', error);
      addToast('Failed to update like', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={handleToggleLike}
      disabled={isLoading}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <FiHeart className={isLiked ? 'fill-current' : ''} />
      <span className="like-count">{likes}</span>
    </button>
  );
};

export default LikeButton;
