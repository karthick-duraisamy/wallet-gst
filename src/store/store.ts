import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { CommonService } from '../services/service';
import uploadReducer from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [CommonService.reducerPath]: CommonService.reducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(CommonService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;