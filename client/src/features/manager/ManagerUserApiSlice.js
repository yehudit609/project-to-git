import apiSlice from "../../app/apiSlice"

const managerApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addNewUser: build.mutation({
            query: (registerUser) => ({
                url: "/api/user",
                method: "POST",
                body: registerUser
            }),
            invalidatesTags:["User"]
        }),
        getAllUsers: build.query({
            query: () => ({
                url: "/api/user",
                method: "GET",
            }),
            providesTags:["User"]
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: "/api/user/"+id,
                method: "DELETE"
            }),
            invalidatesTags:["User"]
        }),
        updateUser: build.mutation({
            query: (product) => ({
                url: "/api/user",
                method: "PUT",
                body: product
            }),
            invalidatesTags:["User"]
        }),
        updateUserActive: build.mutation({
            query: (id) => ({
                url: "/api/user/active/"+id,
                method: "PUT"
            }),
            invalidatesTags:["User"]
        }),
        getUserById: build.query({
            query: (id) => ({
                url: "/api/user/"+id,
                method: "GET",
            })
        })
    })
})
export const {useAddNewUserMutation,useDeleteUserMutation,useGetAllUsersQuery,useGetUserByIdQuery,useUpdateUserActiveMutation,useUpdateUserMutation} = managerApiSlice