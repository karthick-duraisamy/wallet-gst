import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
}

interface UploadState {
  files: UploadFile[];
  uploadType: 'agency' | 'airline';
  subOption: 'non-ayp' | 'gstr-2a';
  loading: boolean;
}

const initialState: UploadState = {
  files: [],
  uploadType: 'agency',
  subOption: 'non-ayp',
  loading: false,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadType: (state, action: PayloadAction<'agency' | 'airline'>) => {
      state.uploadType = action.payload;
    },
    setSubOption: (state, action: PayloadAction<'non-ayp' | 'gstr-2a'>) => {
      state.subOption = action.payload;
    },
    addFiles: (state, action: PayloadAction<UploadFile[]>) => {
      state.files = [...state.files, ...action.payload].slice(0, 3); // Max 3 files
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.files = state.files.filter(file => file.id !== action.payload);
    },
    updateFileStatus: (state, action: PayloadAction<{ id: string; status: UploadFile['status'] }>) => {
      const file = state.files.find(f => f.id === action.payload.id);
      if (file) {
        file.status = action.payload.status;
      }
    },
    clearFiles: (state) => {
      state.files = [];
    },
  },
});

export const { setUploadType, setSubOption, addFiles, removeFile, updateFileStatus, clearFiles } = uploadSlice.actions;
export default uploadSlice.reducer;