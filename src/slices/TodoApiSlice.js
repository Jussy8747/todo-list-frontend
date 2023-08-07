import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({baseUrl: 'https://ec2-3-84-162-115.compute-1.amazonaws.com'}),
   tagTypes: ['todos'],
    endpoints: (builder) =>({


        getTodo: builder.query({
            query: (dayOfWeek) => `users/getTodo?dayofweek=${dayOfWeek}`,
            providesTags: ['todos']
          }),


        addTodo: builder.mutation({
            query: (data)=>({
                url: 'users/addTodo',
                method:'POST',
                body: data
            }),
           invalidatesTags: ['todos']
        }),

        deteleTodo: builder.mutation({
            query:(id)=>({
                url: `users/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['todos']
        }),

        clearTodo: builder.mutation({
            query: (dayOfWeek)=>({
                url: `users/clear/${dayOfWeek}`,
                method: "DELETE"
            }),
            invalidatesTags:['todos']
        }),

        searchTodo: builder.query({
            query: (searchItem) => {
               (searchItem);
              return `users/search?query=${searchItem}`;
            },
          }),

        searchTodoByDay: builder.query({
          query: ({ day, q })=>`users/search/dayofweek?dayofweek=${day}&query=${q}`
          }),
})
})

export const {
    useAddTodoMutation, 
    useGetTodoQuery, 
    useDeteleTodoMutation, 
    useClearTodoMutation,
    useSearchTodoQuery,
    useSearchTodoByDayQuery
} = todoApi