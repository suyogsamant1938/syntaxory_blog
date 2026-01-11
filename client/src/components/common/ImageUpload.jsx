import { useState, useRef, useEffect } from 'react';
import { FiUploadCloud, FiX, FiImage, FiLoader } from 'react-icons/fi';
import imageService from '../../services/imageService';
import { useToast } from '../../contexts/ToastContext';
import './ImageUpload.css';

const ImageUpload = ({ onUploadComplete, initialImageUrl }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(initialImageUrl || null);
  const fileInputRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialImageUrl) {
      setPreview(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
      addToast('Please upload an image file', 'error');
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      addToast('File too large. Max size is 2MB', 'error');
      return;
    }

    // Set local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      
      // 1. Get signed URL
      const signedUrl = await imageService.getSignedUrl(fileName, file.type);
      
      // 2. Upload to Supabase
      await imageService.uploadToSignedUrl(signedUrl, file);
      
      // 3. Get public URL
      const publicUrl = imageService.getPublicUrl(fileName);
      console.log('Successfully uploaded to:', publicUrl);
      
      setPreview(publicUrl);
      onUploadComplete(publicUrl);
      addToast('Image uploaded successfully', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      addToast(error.response?.data?.message || 'Failed to upload image', 'error');
      // On error, we keep the local preview so user sees what তারা selects, 
      // but maybe we should clear it if the backend needs that URL to be empty.
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadComplete('');
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      {preview ? (
        <div className="image-preview-wrapper">
          <img 
            src={preview} 
            alt="Preview" 
            className="image-preview" 
            onError={(e) => {
              console.error('Image failed to load:', preview);
              addToast('Image uploaded but failed to preview. Please check Supabase permissions.', 'warning');
            }}
          />
          <button className="remove-image-btn" onClick={removeImage} title="Remove image" type="button">
            <FiX />
          </button>
        </div>
      ) : (
        <div 
          className={`upload-dropzone ${dragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            accept="image/*" 
            className="hidden-input"
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="upload-status">
              <FiLoader className="animate-spin" />
              <span>Uploading image...</span>
            </div>
          ) : (
            <div className="upload-prompt">
              <FiUploadCloud className="upload-icon" />
              <div className="upload-text">
                <strong>Click to upload</strong> or drag and drop
              </div>
              <p className="upload-info">PNG, JPG or WEBP (Max 2MB)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
