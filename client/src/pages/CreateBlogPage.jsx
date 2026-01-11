import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSave, FiCpu, FiType, FiAlignLeft } from 'react-icons/fi';
import { useToast } from '../contexts/ToastContext';
import ImageUpload from '../components/common/ImageUpload';
import blogService from '../services/blogService';
import aiService from '../services/aiService';
import './CreateBlogPage.css';

const CreateBlogPage = () => {
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  
  const { addToast } = useToast();
  const navigate = useNavigate();

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
      
      addToast('Blog content generated successfully!', 'success');
      setShowAiModal(false);
    } catch (error) {
      console.error('AI generation error:', error);
      addToast('Failed to generate content. Please try again.', 'error');
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
      await blogService.createBlog(formData);
      addToast('Blog post published successfully!', 'success');
      navigate('/blogs');
    } catch (error) {
      console.error('Create blog error:', error);
      addToast('Failed to publish blog', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-blog-page">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Create New Post</h1>
          <button 
            className="btn btn-secondary ai-btn"
            onClick={() => setShowAiModal(true)}
          >
            <FiCpu /> Generate with AI
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
              <label>Cover Image</label>
              <ImageUpload 
                onUploadComplete={(url) => setFormData(prev => ({ ...prev, image_url: url }))} 
                initialImageUrl={formData.image_url}
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
              onClick={() => navigate('/blogs')}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <FiSave /> {isSubmitting ? 'Publishing...' : 'Publish Post'}
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
              Let our AI help you draft your next masterpiece.
            </p>

            <div className="form-group">
              <label htmlFor="topic">Topic</label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={aiPrompt.topic}
                onChange={handleAiChange}
                placeholder="e.g., The Future of React Server Components"
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
                    <FiCpu /> Generate Content
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

export default CreateBlogPage;
