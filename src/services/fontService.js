import axios from 'utils/axios';
import { mockFonts } from '../mockData/fonts';

export const fontService = {
  getAllFonts: async () => {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockFonts;
  },

  getFontFile: async (fontUrl) => {
    try {
      const response = await fetch(fontUrl);
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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newFont = {
      id: `font_${mockFonts.length + 1}`,
      ...fontData,
      downloads: 0,
      views: 0,
      rating: 0,
      createdAt: new Date()
    };
    mockFonts.push(newFont);
    return newFont;
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

    const response = await axios.put(`/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteFont: async (id) => {
    await axios.delete(`/${id}`);
  },

  toggleFontStatus: async (id) => {
    const response = await axios.patch(`/${id}/toggle-status`);
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
