import baseApi from "../../app/baseApi";

const userProgressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createUserProgress: builder.mutation({
            query: (userProgressData) => ({
                url:'/userProgress/',
                method:'POST',
                body:userProgressData
            })
        }),

        getUserProgressByUser:builder.query({
            query:()=>({
                url:'/userProgress/getUserProgress/',
                method:'GET'
            })
        })
    })
})

export const {useCreateUserProgressMutation,useGetUserProgressByUserQuery}=userProgressApi