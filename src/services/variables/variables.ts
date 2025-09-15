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
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
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
      { records: any[]; count: number; category: any[] },
      { page?: number; page_size?: number; category?: string; filterData?: Record<string, any> }
    >({
      query: (params) => {
        // Decide endpoint dynamically from params.category
        const category = params?.category;
        const endpoint =
          category === "agency"
            ? "reconcilationHistoryAgency/"
            : category === "airline"
            ? "reconcilationHistoryAirline/"
            : "reconcilationHistory/";

        // Build query params
        const queryParams = new URLSearchParams();

        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            queryParams.append(key, String(value));
          }
        });

        return {
          url: `${endpoint}?${queryParams.toString()}`,
          method: "GET",
        };
      },

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

