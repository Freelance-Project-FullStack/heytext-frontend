import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk actions
export const getFonts = createAsyncThunk('fonts/getFonts', async ({ page, limit, search, category }) => {
  const response = await axios.get('/api/fonts', {
    params: { page, limit, search, category }
  });
  return response.data;
});

export const getFontById = createAsyncThunk('fonts/getFontById', async (id) => {
  const response = await axios.get(`/api/fonts/${id}`);
  return response.data;
});

export const createFont = createAsyncThunk('fonts/createFont', async (fontData) => {
  const formData = new FormData();
  Object.keys(fontData).forEach((key) => {
    if (key === 'styles' || key === 'uses' || key === 'tags') {
      formData.append(key, JSON.stringify(fontData[key]));
    } else if (fontData[key] instanceof File) {
      formData.append(key, fontData[key]);
    } else {
      formData.append(key, fontData[key]);
    }
  });

  const response = await axios.post('/api/fonts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

export const updateFont = createAsyncThunk('fonts/updateFont', async ({ id, fontData }) => {
  const formData = new FormData();
  Object.keys(fontData).forEach((key) => {
    if (key === 'styles' || key === 'uses' || key === 'tags') {
      formData.append(key, JSON.stringify(fontData[key]));
    } else if (fontData[key] instanceof File) {
      formData.append(key, fontData[key]);
    } else {
      formData.append(key, fontData[key]);
    }
  });

  const response = await axios.put(`/api/fonts/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
});

export const deleteFont = createAsyncThunk('fonts/deleteFont', async (id) => {
  await axios.delete(`/api/fonts/${id}`);
  return id;
});

export const toggleFontActive = createAsyncThunk('fonts/toggleActive', async (id) => {
  const response = await axios.patch(`/api/fonts/${id}/toggle-active`);
  return response.data;
});

export const downloadFont = createAsyncThunk('fonts/downloadFont', async (id) => {
  const response = await axios.post(`/api/fonts/${id}/download`);
  return response.data;
});

export const rateFont = createAsyncThunk('fonts/rateFont', async ({ id, rating }) => {
  const response = await axios.post(`/api/fonts/${id}/rating`, { rating });
  return response.data;
});

const initialState = {
  fonts: [],
  currentFont: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1
};

const fontSlice = createSlice({
  name: 'fonts',
  initialState,
  reducers: {
    clearCurrentFont: (state) => {
      state.currentFont = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Fonts
      .addCase(getFonts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFonts.fulfilled, (state, action) => {
        state.loading = false;
        state.fonts = action.payload.fonts;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getFonts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get Font By Id
      .addCase(getFontById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFontById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFont = action.payload;
      })
      .addCase(getFontById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Font
      .addCase(createFont.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFont.fulfilled, (state, action) => {
        state.loading = false;
        state.fonts.push(action.payload);
      })
      .addCase(createFont.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Font
      .addCase(updateFont.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFont.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fonts.findIndex((font) => font.id === action.payload.id);
        if (index !== -1) {
          state.fonts[index] = action.payload;
        }
        state.currentFont = action.payload;
      })
      .addCase(updateFont.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Font
      .addCase(deleteFont.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFont.fulfilled, (state, action) => {
        state.loading = false;
        state.fonts = state.fonts.filter((font) => font.id !== action.payload);
        if (state.currentFont?.id === action.payload) {
          state.currentFont = null;
        }
      })
      .addCase(deleteFont.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Toggle Font Active
      .addCase(toggleFontActive.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFontActive.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.fonts.findIndex((font) => font.id === action.payload.id);
        if (index !== -1) {
          state.fonts[index] = action.payload;
        }
        if (state.currentFont?.id === action.payload.id) {
          state.currentFont = action.payload;
        }
      })
      .addCase(toggleFontActive.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Download Font
      .addCase(downloadFont.fulfilled, (state, action) => {
        const index = state.fonts.findIndex((font) => font.id === action.payload.id);
        if (index !== -1) {
          state.fonts[index] = action.payload;
        }
        if (state.currentFont?.id === action.payload.id) {
          state.currentFont = action.payload;
        }
      })

      // Rate Font
      .addCase(rateFont.fulfilled, (state, action) => {
        const index = state.fonts.findIndex((font) => font.id === action.payload.id);
        if (index !== -1) {
          state.fonts[index] = action.payload;
        }
        if (state.currentFont?.id === action.payload.id) {
          state.currentFont = action.payload;
        }
      });
  }
});

export const { clearCurrentFont, setError, clearError } = fontSlice.actions;

export default fontSlice.reducer;
