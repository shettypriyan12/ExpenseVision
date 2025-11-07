import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "@/app/utils/axiosHttp";

export const addExpense = createAsyncThunk("expense/add", async (data, { dispatch, rejectWithValue }) => {

    try {
        const res = await axiosHttp.post('/expense', data);
        dispatch(getAllExpense());

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t add expense" });
    }
})

export const getAllExpense = createAsyncThunk("expense/all", async (_, { rejectWithValue }) => {

    try {
        const res = await axiosHttp.get("/expense");
        // console.log("Thunk payload:", res.data.data);

        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch expenses" });
    }
})

export const updateExpense = createAsyncThunk("expense/updateExpense", async ({ id, ...data }, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.put(`/expense/${id}`, data);

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t update expense" });
    }
}
);

export const deleteExpense = createAsyncThunk("expense/deleteExpense", async (id, { rejectWithValue }) => {
    try {
        await axiosHttp.delete(`/expense/${id}`);

        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t delete expense" });
    }
}
);