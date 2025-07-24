import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceRecord {
  id: string;
  pnrTicketNumber?: string;
  invoiceNumber: string;
  supplierName: string;
  invoiceDate: string;
  type: 'Tax Invoice' | 'Credit Note' | 'Debit Note';
  amount: number;
  taxAmount: number;
  status: 'Active' | 'Cancelled';
}

interface InvoiceState {
  records: InvoiceRecord[];
  searchType: 'pnr' | 'invoice';
  searchFilters: {
    type?: string;
  };
  loading: boolean;
}

const initialState: InvoiceState = {
  records: [
    {
      id: '1',
      pnrTicketNumber: 'ABC123',
      invoiceNumber: 'INV-2024-001',
      supplierName: 'IndiGo Airlines',
      invoiceDate: '2024-01-15',
      type: 'Tax Invoice',
      amount: 25000,
      taxAmount: 4500,
      status: 'Active',
    },
    {
      id: '2',
      pnrTicketNumber: 'DEF456',
      invoiceNumber: 'INV-2024-002',
      supplierName: 'Air India',
      invoiceDate: '2024-01-16',
      type: 'Credit Note',
      amount: 18000,
      taxAmount: 3240,
      status: 'Active',
    },
  ],
  searchType: 'pnr',
  searchFilters: {},
  loading: false,
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setSearchType: (state, action: PayloadAction<'pnr' | 'invoice'>) => {
      state.searchType = action.payload;
    },
    setSearchFilters: (state, action: PayloadAction<{ type?: string }>) => {
      state.searchFilters = action.payload;
    },
    setRecords: (state, action: PayloadAction<InvoiceRecord[]>) => {
      state.records = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setSearchType, setSearchFilters, setRecords, setLoading } = invoiceSlice.actions;
export default invoiceSlice.reducer;