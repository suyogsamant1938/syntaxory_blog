import { useState, useEffect } from 'react';
import { FiSend, FiMessageSquare } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import commentService from '../../services/commentService';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './CommentSection.css';

dayjs.extend(relativeTime);

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const data = await commentService.getComments(blogId);
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isAuthenticated) return;

    setIsSubmitting(true);
    try {
      const addedComment = await commentService.addComment(blogId, newComment);
      // Optimistically add to list or re-fetch
      // Assuming API returns the created comment with user details
      // If not, we might need to fetch again or construct a temp object
      setComments([addedComment, ...comments]);
      setNewComment('');
      addToast('Comment posted successfully', 'success');
    } catch (error) {
      console.error('Error posting comment:', error);
      addToast('Failed to post comment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="section-title">
        <FiMessageSquare /> Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="user-avatar">
            {user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="input-wrapper">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a thoughtful comment..."
              rows="3"
              disabled={isSubmitting}
            />
            <button 
              type="submit" 
              className="btn-submit"
              disabled={!newComment.trim() || isSubmitting}
            >
              <FiSend /> {isSubmitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Please <a href="/login">login</a> to leave a comment.</p>
        </div>
      )}

      {/* Comments List */}
      <div className="comments-list">
        {isLoading ? (
          <div className="loading-comments">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-avatar">
                {comment.user_name?.charAt(0) || 'U'}
              </div>
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.user_name || 'User'}</span>
                  <span className="comment-date">{dayjs(comment.created_at).fromNow()}</span>
                </div>
                <p className="comment-text">{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-comments">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
