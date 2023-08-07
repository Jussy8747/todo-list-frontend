import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authUserApi = createApi({
    reducerPath: 'authUserApi',
    baseQuery: fetchBsaeQuery: {'https://todoappbackend-jz46.onrender.com/'}),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data)=>({
                url: 'users/register',
                method:'POST',
                body: data
            })
        }),
        login: builder.mutation({
            query: (data)=>({
                url: 'users/signin',
                method:'POST',
                body: data
            })
        }),

        getprofile: builder.query({
            query:()=> 'users/profile'
        }),

        logout: builder.mutation({
            query: ()=>({
                url: `users/logout`,
                method: 'POST'
            })
        }),

        forgetPassword: builder.mutation({
            query: (data)=>{
                return{
                    url: `users/forgetpassword`,
                    method: 'POST',
                    body: data
                }
            }
        }),
        resetPassword: builder.mutation({
            query: (token)=>({
                url: `users/resetPassword`,
                method: 'POST',
                body: token
            })
        }),

        reset_password: builder.mutation({
            query: (data)=>({
                url: `https://ec2-3-84-162-115.compute-1.amazonaws.com/users/reset-password`,
                method: 'POST',
                body: data
            })
        }),
        

        
    })
})


export const {
    useRegisterMutation, 
    useLoginMutation,
    useLogoutMutation,
    useGetprofileQuery,
    useForgetPasswordMutation,
    useResetPasswordMutation,
    useReset_passwordMutation
    } = authUserApi
