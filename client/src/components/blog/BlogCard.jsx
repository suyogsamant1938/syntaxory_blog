import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiClock, FiUser } from 'react-icons/fi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import './BlogCard.css';

dayjs.extend(relativeTime);

const BlogCard = ({ blog }) => {
  const {
    id,
    title,
    content,
    author_id,
    author_type,
    created_at,
    likes_count = 0,
    comments_count = 0,
    image_url,
    tags = []
  } = blog;

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <article className="blog-card">
      {/* Image */}
      {image_url && (
        <Link to={`/blog/${id}`} className="blog-card-image-link">
          <div className="blog-card-image">
            <img src={image_url} alt={title} />
            <div className="blog-card-overlay"></div>
          </div>
        </Link>
      )}

      {/* Content */}
      <div className="blog-card-content">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="blog-card-tags">
            {tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="blog-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <Link to={`/blog/${id}`} className="blog-card-title-link">
          <h3 className="blog-card-title">{title}</h3>
        </Link>

        {/* Excerpt */}
        <p className="blog-card-excerpt">
          {content.substring(0, 150)}...
        </p>

        {/* Footer */}
        <div className="blog-card-footer">
          {/* Author & Date */}
          <div className="blog-card-meta">
            <div className="blog-author">
              <div className="author-avatar">
                <FiUser />
              </div>
              <div className="author-info">
                <span className="author-name">
                  {author_type === 'AI' ? '🤖 AI Author' : 'Developer'}
                </span>
                <span className="blog-date">
                  {dayjs(created_at).fromNow()}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="blog-card-stats">
            <div className="stat">
              <FiClock />
              <span>{readTime} min read</span>
            </div>
            <div className="stat">
              <FiHeart />
              <span>{likes_count}</span>
            </div>
            <div className="stat">
              <FiMessageCircle />
              <span>{comments_count}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
