import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import uploadSlice from './slices/uploadSlice';
import reconciliationSlice from './slices/reconciliationSlice';
import invoiceSlice from './slices/invoiceSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    upload: uploadSlice,
    reconciliation: reconciliationSlice,
    invoice: invoiceSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;