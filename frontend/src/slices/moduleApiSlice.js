import { apiSlice } from "./apiSlice";
import {MODULE_URL} from "../constants";

const moduleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getModules: builder.query({  
            query: () => ({
                url: `${MODULE_URL}/`,
            }),// Use providesTags for queries
        }),
        createModule: builder.mutation({
            query: (data) => ({
                url: `${MODULE_URL}/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Module'],  // Correctly invalidating the cache
        }),
        updateModule: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `${MODULE_URL}/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Module'],  
        }),
        deleteModule: builder.mutation({
            query: (id) => ({
                url: `${MODULE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Module'],  
        }),
        getModule: builder.query({  
            query: (id) => ({
                url: `${MODULE_URL}/${id}`,
            }),
            providesTags: ['Module'],  // Providing the tag
        }),
    }),
});

export const { 
    useGetModulesQuery,  // Changed from mutation to query
    useCreateModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useGetModuleQuery,
} = moduleApiSlice;
