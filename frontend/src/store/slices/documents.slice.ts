import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, type Document } from '../../models/Document';
import { apiCall } from '../../utils/apiCall';
import { BoundingBox } from '../../utils/boundingBox';

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchDocument.fulfilled,
      (state, action: PayloadAction<Document<Item>>) => {
        state.loading = false;
        state.document = {
          ...action.payload,
          items: action.payload.items.map((item) => new BoundingBox(item)),
        };
      },
    );
    builder.addCase(fetchDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? 'Failed to load document';
    });
  },
});

export default filesSlice.reducer;
