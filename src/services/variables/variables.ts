// services/invoice.ts
import { CommonService } from '../service';

export const InvoiceService = CommonService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    cummulativeService: builder.mutation<
  { records: any[]; count: number; category:any[] },
  { page?: number, page_size?: number, category: "agency" | "airline"; pnrno?: string, Type?: string; start?: string, end?: string }
>({
    query: ({ page, page_size, category, pnrno, Type, start, end }) => {
      // build query params dynamically
      const queryParams = new URLSearchParams();

      if (page) queryParams.append("page", String(page));
      if (page_size) queryParams.append("page_size", String(page_size));
      if (start) queryParams.append("startDate", start);
      if (end) queryParams.append("endDate", end);

      return {
        url: `cummulativeInvoice${category === "agency" ? "Agency" : "Airline"}/?${queryParams.toString()}`,
        method: "POST",
        body: {
          pnrno,
          Type
        },
      };
    },
  }),
  }),
  overrideExisting: true,
});

export const ReconcilService = CommonService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    reconcilService: builder.mutation<
      { records: any[]; count: number; category:any[] },
      { page: number, page_size: number }                  
    >({
      query: ({page, page_size}) => ({
        url: `reconsilationHistoryAgency/?page=${page}&page_size=${page_size}`,
        method: 'GET',
        // body:{

        // },
      }),
    }),
  }),
  overrideExisting: true,
});

export const UploadService = CommonService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: `uploadFile/`,  // add trailing slash if backend requires
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

// Unified hook exports
// Correct unified hook exports
export const {
  useCummulativeServiceMutation: useCumulativeFilterMutation,
} = InvoiceService;

export const {
  useReconcilServiceMutation: useReconcilFilterMutation,
} = ReconcilService;

export const {
  useUploadFileMutation: useUploadFilterMutation,
} = UploadService;

