// services/invoice.ts
import { CommonService } from '../service';


export const InvoiceService = CommonService.enhanceEndpoints({ addTagTypes: ['invoice'] }).injectEndpoints({
  endpoints: (build) => ({
    // Manual GET for cumulative invoices
    cummulativeService: build.mutation<
      { records: any[]; count: number; category: any[] }, // Response type
      Record<string, any> // Accept any dynamic params
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // dynamically add all defined params
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });

        // Optional: adjust endpoint based on category
        const category = params.category === 'agency' ? 'Agency' : params.category === 'airline' ? 'Airline' : '';
        const endpoint = category ? `cummulativeInvoice${category}/` : `cummulativeInvoice/`;

        return {
          url: `${endpoint}?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      invalidatesTags: ['invoice'], // optional caching invalidation
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
        url: `reconcilationHistoryAgency/?page=${page}&page_size=${page_size}`,
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
export const { useCummulativeServiceMutation} = InvoiceService;

export const { useReconcilServiceMutation: useReconcilFilterMutation } = ReconcilService;

export const { useUploadFileMutation: useUploadFilterMutation} = UploadService;

