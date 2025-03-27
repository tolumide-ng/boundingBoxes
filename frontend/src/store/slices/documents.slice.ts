import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiCall } from '../../utils/apiCall';
import { Document } from '../../models/Document';

export const fetchDocument = createAsyncThunk(
  'files/fetchDocument',
  async () => {
    const data = await apiCall<Document>({
      path: 'getDocument',
      method: 'GET',
    });

    return data;
  },
);

interface FilesState {
  document: Document | null;
  loading: boolean;
  error: string | null;
}

const initialState: FilesState = {
  document: null,
  loading: false,
  error: null,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    updateBoundingContext: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchDocument.fulfilled,
      (state, action: PayloadAction<Document>) => {
        state.loading = false;
        state.document = action.payload
      },
    );
    builder.addCase(fetchDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to load document';
    });
  },
});

export const { updateBoundingContext } = filesSlice.actions;
export default filesSlice.reducer;
