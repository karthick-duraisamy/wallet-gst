import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
}
export type SubOption = 'non-ayp' | 'gstr-2a';
interface UploadState {
  files: Record<SubOption, UploadFile[]>; // Fix: files per subOption
  uploadType: 'agency' | 'airline';
  subOption: SubOption;
  loading: boolean;
}

const initialState: UploadState = {
  uploadType: 'agency',
  subOption: 'non-ayp',
  loading: false,
  files: {
    "non-ayp":[],
    "gstr-2a":[]
  },
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadType: (state, action: PayloadAction<'agency' | 'airline'>) => {
      state.uploadType = action.payload;
    },
    setSubOption: (state, action: PayloadAction<SubOption>) => {
      state.subOption = action.payload;
    },
    addFiles: (state, action: PayloadAction<{ tabKey: keyof UploadState['files']; files: UploadFile[] }>) => {
      const { tabKey, files } = action.payload;
      state.files[tabKey] = [...state.files[tabKey], ...files].slice(0, 3);
    },
    removeFile: (state, action: PayloadAction<{ tabKey: keyof UploadState['files']; fileId: string }>) => {
      const { tabKey, fileId } = action.payload;
      state.files[tabKey] = state.files[tabKey].filter(file => file.id !== fileId);
    },
    updateFileStatus: (state, action: PayloadAction<{ tabKey: keyof UploadState['files']; id: string; status: UploadFile['status'] }>) => {
      const { tabKey, id, status } = action.payload;
      const file = state.files[tabKey].find(f => f.id === id);
      if (file) {
        file.status = status;
      }
    },

    clearFiles: (state, action: PayloadAction<{ tabKey: SubOption }>) => {
      const { tabKey } = action.payload;
      state.files[tabKey] = [];
    },
  },
});

export const { setUploadType, setSubOption, addFiles, removeFile, updateFileStatus, clearFiles } = uploadSlice.actions;
export default uploadSlice.reducer;