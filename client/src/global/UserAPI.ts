import { createApi, 
    fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IData, IUser, ILogin } from "../models/Interfaces";
import { RType, LType } from "../validation/Schema";
const URL = "http://localhost:9000/api";

export const UserAPI = createApi({
    reducerPath: "UserAPI",
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({ baseUrl: `${URL}` }),
    endpoints: (builder) => ({
        all: builder.query<IData, void>({
            query: () => ({
                url: "/user",
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        one: builder.query<IUser, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "GET"
            }),
            providesTags: ["Users"]
        }),
        reg: builder.mutation<RType, RType>({
            query: (payload) => ({
                url: "/user/register",
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Users"]
        }),
        log: builder.mutation<ILogin, LType>({
            query: (payload) => ({
                url: `/user/login`,
                method: "POST",
                body: payload
            }),
            invalidatesTags: ["Users"]
        }),
        update: builder.mutation<IUser, IUser>({
            query: ({ id, ...payload }) => ({
                url: `/user/${id}`,
                method: "PUT",
                body: payload
            }),
            invalidatesTags: ["Users"]
        }),
        delete: builder.mutation<void, number>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Users"]
        })
    })
});



