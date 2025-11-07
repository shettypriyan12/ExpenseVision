import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "@/app/utils/axiosHttp";


export const getUsers = createAsyncThunk("users/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.get("/user");

        // console.log(res.data.data);
        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch users" });

    }
})

export const getUser = createAsyncThunk("users/fetchById", async(id, {rejectWithValue}) => {
    try{
        const res = await axiosHttp.get(`/user/${id}`);

        // console.log(res.data.data);
        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch user" });

    }
})

