import axios from 'utils/axios';

export const fontService = {
  getAllFonts: async () => {
    const response = await axios.get(`/fonts`);
    return response.data;
  },

  searchFonts: async (params) => {
    try {
      const response = await axios.get(`/fonts/search`, { params });
      return response.data;
    } catch (error) {
      console.error('Error searching fonts:', error);
      throw error;
    }
  },

  getFontFile: async (fontUrl) => {
    try {
      const response = await axios.get(fontUrl);
      const fontBlob = await response.blob();
      return URL.createObjectURL(fontBlob);
    } catch (error) {
      console.error('Error loading font file:', error);
      throw error;
    }
  },

  createFont: async (fontData) => {
    // Handle font file upload
    if (fontData.fontFile) {
      const fontUrl = await handleFontFileUpload(fontData.fontFile);
      fontData.fontUrl = fontUrl;
    }

    // Handle preview image upload
    if (fontData.previewImage) {
      const previewUrl = await handlePreviewImageUpload(fontData.previewImage);
      fontData.previewUrl = previewUrl;
    }

    const newFont = {
      ...fontData,
      downloads: 0,
      views: 0,
      rating: 0,
      createdAt: new Date()
    };
    const response = await axios.post(`/fonts`, newFont);
    return response.data;
  },

  updateFont: async (id, fontData) => {
    const formData = new FormData();
    Object.keys(fontData).forEach((key) => {
      if (key === 'styles' || key === 'uses' || key === 'tags') {
        formData.append(key, JSON.stringify(fontData[key]));
      } else if (key === 'fontFile' || key === 'previewImage') {
        if (fontData[key]) {
          formData.append(key, fontData[key]);
        }
      } else {
        formData.append(key, fontData[key]);
      }
    });

    const response = await axios.put(`/fonts/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteFont: async (id) => {
    await axios.delete(`/fonts/${id}`);
  },

  toggleFontStatus: async (id) => {
    const response = await axios.patch(`/fonts/${id}/toggle-status`);
    return response.data;
  },

  downloadFont: async (id) => {
    const response = await axios.get(`/fonts/${id}/download`);
    return response.data;
  }
};

// Helper function to handle font file upload
const handleFontFileUpload = async (file) => {
  // In a real implementation, this would upload to a server
  // For now, we'll create a local URL
  return URL.createObjectURL(file);
};

// Helper function to handle preview image upload
const handlePreviewImageUpload = async (file) => {
  // In a real implementation, this would upload to a server
  // For now, we'll create a local URL
  return URL.createObjectURL(file);
};
