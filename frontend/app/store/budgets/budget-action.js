import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "@/app/utils/axiosHttp";

export const addBudget = createAsyncThunk("budget/add", async (values, { dispatch, rejectWithValue }) => {

    try {
        const res = await axiosHttp.post('/budget', values);
        dispatch(getAllBudget());

        return res.data.data;
    } catch (err) { 
        return rejectWithValue(err.response?.data || { message: "Couldn’t add budget" });
    }
})

export const getAllBudget = createAsyncThunk("budget/all", async (_, { rejectWithValue }) => {

    try {
        const res = await axiosHttp.get("/budget");
        // console.log("Thunk payload:", res.data.data);
        
        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch budgets" });
    }
})

export const updateBudget = createAsyncThunk("budget/updateBudget", async ({ id, ...data }, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.put(`/budget/${id}`, data);

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t update budget" });
    }
}
);

export const deleteBudget = createAsyncThunk("budget/deleteBudget", async (id, { dispatch , rejectWithValue }) => {
    try {
        await axiosHttp.delete(`/budget/${id}`);
        dispatch(getAllBudget());
        return id;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t delete budget" });
    }
}
);