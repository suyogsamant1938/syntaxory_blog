import api from './api';
import axios from 'axios';
import { supabase } from '../lib/supabase';

const imageService = {
  /**
   * Fetches a pre-signed upload URL from the backend
   * @param {string} fileName 
   * @param {string} fileType 
   * @returns {Promise<string>} signedUrl
   */
  getSignedUrl: async (fileName, fileType) => {
    const response = await api.post('/images/upload-image', { fileName, fileType });
    return response.data.signedUrl;
  },

  /**
   * Uploads a file directly to Supabase Storage using a pre-signed URL
   * @param {string} signedUrl 
   * @param {File} file 
   * @returns {Promise<void>}
   */
  uploadToSignedUrl: async (signedUrl, file) => {
    await axios.put(signedUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  },

  /**
   * Generates the public URL for an uploaded file
   * @param {string} fileName 
   * @returns {string}
   */
  getPublicUrl: (fileName) => {
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  }
};

export default imageService;
