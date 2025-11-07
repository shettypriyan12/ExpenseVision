import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "@/app/utils/axiosHttp";

export const addIncome = createAsyncThunk("income/add", async (values, { dispatch, rejectWithValue }) => {

    try {
        const res = await axiosHttp.post('/income', values);
        dispatch(getAllIncome());

        return res.data.data;
    } catch (err) { 
        return rejectWithValue(err.response?.data || { message: "Couldn’t add income" });
    }
})

export const getAllIncome = createAsyncThunk("income/all", async (_, { rejectWithValue }) => {

    try {
        const res = await axiosHttp.get("/income");
        // console.log("Thunk payload:", res.data.data);
        
        return res.data.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t fetch incomes" });
    }
})

export const updateIncome = createAsyncThunk("income/updateIncome", async ({ id, ...data }, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.put(`/income/${id}`, data);

        return res.data.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t update income" });
    }
}
);

export const deleteIncome = createAsyncThunk("income/deleteIncome", async (id, { rejectWithValue }) => {
    try {
        await axiosHttp.delete(`/income/${id}`);

        return id;
    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Couldn’t delete income" });
    }
}
);