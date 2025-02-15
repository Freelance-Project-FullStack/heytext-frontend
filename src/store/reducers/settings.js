import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  payment: {
    banking: {
      bankName: 'Vietcombank',
      accountNumber: '9866564502',
      merchantCode: '970436',
      accountName: 'PHAM QUANG THINH',
      phoneNumber: '0866564502',
      transferPrefix: 'PACKAGE_(userId)_',
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
    smtpUser: 'phamquangquang2008@gmail.com',
    smtpPass: '********',
    senderName: 'Heytext Admin'
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
