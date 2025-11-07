import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "@/app/utils/axiosHttp";

export const addCategory = createAsyncThunk("categories/add", async (values, { dispatch, rejectWithValue }) => {

    try {
        const res = await axiosHttp.post('/categories', values);
        dispatch(getAllCategory());

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t add categories" });
    }
})

export const getAllCategory = createAsyncThunk("categories/all", async (_, { rejectWithValue }) => {

    try {
        const res = await axiosHttp.get(`/categories`);

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch categories" });
    }
})
