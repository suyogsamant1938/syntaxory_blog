import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiCpu, FiImage, FiType, FiAlignLeft, FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../contexts/ToastContext';
import blogService from '../services/blogService';
import aiService from '../services/aiService';
import './CreateBlogPage.css'; // Reusing create page styles

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technology',
    image_url: ''
  });
  const [aiPrompt, setAiPrompt] = useState({
    topic: '',
    style: 'technical'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setIsLoading(true);
      const blog = await blogService.getBlogById(id);
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        category: blog.category || 'Technology',
        image_url: blog.image_url || ''
      });
      setAiPrompt(prev => ({ ...prev, topic: blog.title || '' }));
    } catch (error) {
      console.error('Error fetching blog:', error);
      addToast('Failed to load blog post', 'error');
      navigate('/profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAiChange = (e) => {
    setAiPrompt({
      ...aiPrompt,
      [e.target.name]: e.target.value
    });
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.topic) {
      addToast('Please enter a topic for AI generation', 'error');
      return;
    }

    setIsGenerating(true);
    try {
      const generatedBlog = await aiService.generateBlog(aiPrompt.topic, aiPrompt.style);
      
      setFormData({
        ...formData,
        title: generatedBlog.title || formData.title,
        content: generatedBlog.content || formData.content,
      });
      
      addToast('Blog content updated by AI!', 'success');
      setShowAiModal(false);
    } catch (error) {
      console.error('AI generation error:', error);
      addToast('Failed to generate content', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      addToast('Title and content are required', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await blogService.updateBlog(id, formData);
      addToast('Blog post updated successfully!', 'success');
      navigate('/blogs');
    } catch (error) {
      console.error('Update blog error:', error);
      addToast('Failed to update blog', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="create-blog-page">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div className="loading-spinner-large"></div>
          <p>Loading blog content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-blog-page">
      <div className="container">
        <header className="page-header">
          <div>
            <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
                <FiArrowLeft /> Back
            </button>
            <h1 className="page-title">Edit Post</h1>
          </div>
          <button 
            className="btn btn-secondary ai-btn"
            onClick={() => setShowAiModal(true)}
          >
            <FiCpu /> Rewrite with AI
          </button>
        </header>

        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="form-group">
            <label htmlFor="title">
              <FiType /> Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title"
              disabled={isSubmitting}
            />
          </div>
          <br />

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="Technology">Technology</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="AI">Artificial Intelligence</option>
                <option value="Career">Career</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="image_url">
                <FiImage /> Cover Image URL
              </label>
              <input
                type="text"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <br />

          <div className="form-group">
            <label htmlFor="content">
              <FiAlignLeft /> Content (Markdown supported)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your amazing content here..."
              rows="15"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => navigate(-1)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <FiSave /> {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* AI Generation Modal */}
      {showAiModal && (
        <div className="modal-overlay">
          <div className="modal-content glass">
            <h2 className="modal-title">
              <FiCpu /> AI Writing Assistant
            </h2>
            <p className="modal-subtitle">
              Let our AI help you rewrite or expand your content.
            </p>

            <div className="form-group">
              <label htmlFor="topic">Topic / Instructions</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={aiPrompt.topic}
                onChange={handleAiChange}
                placeholder="e.g., Rewrite this from a more professional perspective"
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="style">Writing Style</label>
              <select
                id="style"
                name="style"
                value={aiPrompt.style}
                onChange={handleAiChange}
              >
                <option value="technical">Technical & Detailed</option>
                <option value="tutorial">Step-by-Step Tutorial</option>
                <option value="opinion">Opinionated & Engaging</option>
                <option value="news">News & Updates</option>
              </select>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-outline"
                onClick={() => setShowAiModal(false)}
                disabled={isGenerating}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiPrompt.topic}
              >
                {isGenerating ? (
                  <>
                    <span className="loading-spinner-sm"></span> Generating...
                  </>
                ) : (
                  <>
                    <FiCpu /> Regenerate
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlogPage;
