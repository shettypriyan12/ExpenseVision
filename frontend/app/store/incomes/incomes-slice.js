import { createSlice } from "@reduxjs/toolkit";
import { addIncome, getAllIncome, updateIncome, deleteIncome } from "./incomes-action";

const initialIncomeState = {
    income: [],
    status: "idle",
    addStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
    addErr: null,
    updateErr: null,
    deleteErr: null,
}


const incomeSlice = createSlice({
    name: "income",
    initialState: initialIncomeState,
    // reducers: {},
    extraReducers: (builder) => {
        builder //all
            .addCase(getAllIncome.pending, (state) => {
                state.status = "pending"
            })
            .addCase(getAllIncome.fulfilled, (state, action) => {
                state.status = "fulfilled";
                // console.log("Reducer payload:", action.payload);
                state.income = action.payload;
            })
            .addCase(getAllIncome.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            }) //add
            .addCase(addIncome.pending, (state) => {
                state.addStatus = "pending"
            })
            .addCase(addIncome.fulfilled, (state, action) => {
                state.addStatus = "fulfilled";
                state.income.push(action.payload);
            })
            .addCase(addIncome.rejected, (state, action) => {
                state.addStatus = "rejected";
                state.addErr = action.payload;
            }) //update
            .addCase(updateIncome.pending, (state) => {
                state.updateStatus = "pending"
            })
            .addCase(updateIncome.fulfilled, (state, action) => {
                state.updateStatus = "fulfilled";
                state.income = state.income.map(inc =>
                    inc.id === action.payload.id ? action.payload : inc
                );
            })
            .addCase(updateIncome.rejected, (state, action) => {
                state.updateStatus = "rejected";
                state.updateErr = action.payload;
            }) //delete
            .addCase(deleteIncome.pending, (state) => {
                state.deleteStatus = "pending"
            })
            .addCase(deleteIncome.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.income = state.income.filter(inc => inc.id !== action.payload);
            })
            .addCase(deleteIncome.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.deleteErr = action.payload;
            })
    }
})

// export const incomeActions = incomeSlice.actions;

export default incomeSlice.reducer;