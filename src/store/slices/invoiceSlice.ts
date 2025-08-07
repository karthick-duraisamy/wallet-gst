import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceRecord {
    invoice_number: string,
    pnr: string,
    airline_name: string,
    vendor_name: string,
    invoice_type: string,
    transaction_type: string,
    invoice_date: string
    // status: Active | Cancelled;
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
  records: [],
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