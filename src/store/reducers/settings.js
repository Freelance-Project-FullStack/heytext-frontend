import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payment: {
    vnpay: {
      tmnCode: 'YOUR_TMN_CODE',
      hashSecret: 'YOUR_HASH_SECRET',
      returnUrl: 'http://localhost:3000/payment/callback',
      amount: 990000,
      premiumPlanName: 'Premium - 1 năm'
    }
  },
  openai: {
    apiKey: 'YOUR_OPENAI_API_KEY',
    model: 'gpt-3.5-turbo',
    maxTokens: 2000,
    temperature: 0.7
  },
  emailSettings: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'your-email@gmail.com',
    smtpPass: '********',
    senderName: 'Font Store Admin'
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updatePaymentSettings: (state, action) => {
      state.payment = {
        ...state.payment,
        ...action.payload
      };
    },
    updateOpenAISettings: (state, action) => {
      state.openai = {
        ...state.openai,
        ...action.payload
      };
    },
    updateEmailSettings: (state, action) => {
      state.emailSettings = {
        ...state.emailSettings,
        ...action.payload
      };
    }
  }
});

export const { updatePaymentSettings, updateOpenAISettings, updateEmailSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
