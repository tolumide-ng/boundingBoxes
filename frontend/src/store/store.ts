import { configureStore } from '@reduxjs/toolkit';
import documentsReducer from './slices/documents.slice';

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
