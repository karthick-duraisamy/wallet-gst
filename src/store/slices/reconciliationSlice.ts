import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReconciliationRecord {
  id: string;
  supplierName: string;
  pnrTicketNumber: string;
  invoiceNumber: string;
  invoiceDate: string;
  type: 'Tax Invoice' | 'Credit Note' | 'Debit Note';
  taxClaimable: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processing';
}

interface Filters {
  airline?: string;
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  travelVendor?: string;
}

interface ReconciliationState {
  records: ReconciliationRecord[];
  filters: Filters;
  loading: boolean;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

const initialState: ReconciliationState = {
  records: [
    {
      id: '1',
      supplierName: 'IndiGo Airlines',
      pnrTicketNumber: 'ABC123',
      invoiceNumber: 'INV-2024-001',
      invoiceDate: '2024-01-15',
      type: 'Tax Invoice',
      taxClaimable: 15000,
      status: 'Approved',
    },
    {
      id: '2',
      supplierName: 'Air India',
      pnrTicketNumber: 'DEF456',
      invoiceNumber: 'INV-2024-002',
      invoiceDate: '2024-01-16',
      type: 'Credit Note',
      taxClaimable: 8500,
      status: 'Pending',
    },
    {
      id: '3',
      supplierName: 'SpiceJet',
      pnrTicketNumber: 'GHI789',
      invoiceNumber: 'INV-2024-003',
      invoiceDate: '2024-01-17',
      type: 'Tax Invoice',
      taxClaimable: 12000,
      status: 'Processing',
    },
  ],
  filters: {},
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 3,
  },
};

const reconciliationSlice = createSlice({
  name: 'reconciliation',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.current = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {};
      state.pagination.current = 1;
    },
    setPagination: (state, action: PayloadAction<Partial<typeof initialState.pagination>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setFilters, clearFilters, setPagination, setLoading } = reconciliationSlice.actions;
export default reconciliationSlice.reducer;