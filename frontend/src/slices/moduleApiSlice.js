import { apiSlice } from "./apiSlice";
import { MODULE_URL } from "../constants";

// Define the moduleApiSlice with injected endpoints
const moduleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to get all modules
    getModules: builder.query({
      query: () => ({
        url: `${MODULE_URL}/`,
      }),
      // Use providesTags for queries
      providesTags: ['Module'],
    }),

    // Endpoint to create a new module
    createModule: builder.mutation({
      query: (data) => ({
        url: `${MODULE_URL}/`,
        method: 'POST',
        body: data,
      }),
      // Invalidate the cache for the 'Module' tag after creating a module
      invalidatesTags: ['Module'],
    }),

    // Endpoint to update an existing module
    updateModule: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${MODULE_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      // Invalidate the cache for the 'Module' tag after updating a module
      invalidatesTags: ['Module'],
    }),

    // Endpoint to delete a module
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `${MODULE_URL}/${id}`,
        method: 'DELETE',
      }),
      // Invalidate the cache for the 'Module' tag after deleting a module
      invalidatesTags: ['Module'],
    }),

    // Endpoint to get a single module by ID
    getModule: builder.query({
      query: (id) => ({
        url: `${MODULE_URL}/${id}`,
      }),
      // Use providesTags for queries
      providesTags: ['Module'],
    }),
  }),
});

// Export hooks for using the defined endpoints
export const {
  useGetModulesQuery, 
  useCreateModuleMutation,
  useUpdateModuleMutation,
  useDeleteModuleMutation, 
  useGetModuleQuery, 
} = moduleApiSlice;
