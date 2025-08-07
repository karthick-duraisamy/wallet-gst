// services/invoice.ts
import { CommonService } from '../service';

export const InvoiceService = CommonService.enhanceEndpoints({ addTagTypes: ['Invoice'] }).injectEndpoints({
  endpoints: (builder) => ({
    postInvoiceFilter: builder.mutation<
      { records: any[]; count: number; category:any[] },
      { page: number, page_size: number }                  
    >({
      query: ({page, page_size}) => ({
        url: `cummulativeInvoice/?page=${page}&page_size=${page_size}`,
        method: 'POST',
        body:{

        },
      }),
      transformResponse: (response: any) => {
        const results = response?.response?.data?.results;
        console.log(results,'results');
        
        return {
          records: results?.list_body ,
          count: response?.response?.data?.count ?? 0,
          category: results?.category
        };
      },
      invalidatesTags: ['Invoice'],
    }),
  }),
  overrideExisting: true,
});

export const { usePostInvoiceFilterMutation } = InvoiceService;
