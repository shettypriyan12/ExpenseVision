import { createSlice } from "@reduxjs/toolkit";
import { addExpense, getAllExpense, updateExpense, deleteExpense } from "./expenses-action";

const initialExpenseState = {
    expense: [],
    status: "idle",
    addStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
    addErr: null,
    updateErr: null,
    deleteErr: null,
}


const expenseSlice = createSlice({
    name: "expense",
    initialState: initialExpenseState,
    // reducers: {},
    extraReducers: (builder) => {
        builder //all
            .addCase(getAllExpense.pending, (state) => {
                state.status = "pending"
            })
            .addCase(getAllExpense.fulfilled, (state, action) => {
                state.status = "fulfilled";
                // console.log("Reducer payload:", action.payload);
                state.expense = action.payload;
            })
            .addCase(getAllExpense.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            }) //add
            .addCase(addExpense.pending, (state) => {
                state.addStatus = "pending"
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.addStatus = "fulfilled";
                state.expense.push(action.payload);
            })
            .addCase(addExpense.rejected, (state, action) => {
                state.addStatus = "rejected";
                state.addErr = action.payload;
            }) //update
            .addCase(updateExpense.pending, (state) => {
                state.updateStatus = "pending"
            })
            .addCase(updateExpense.fulfilled, (state, action) => {
                state.updateStatus = "fulfilled";
                state.expense = state.expense.map(exp =>
                    exp.id === action.payload.id ? action.payload : exp
                );
            })
            .addCase(updateExpense.rejected, (state, action) => {
                state.updateStatus = "rejected";
                state.updateErr = action.payload;
            }) //delete
            .addCase(deleteExpense.pending, (state) => {
                state.deleteStatus = "pending"
            })
            .addCase(deleteExpense.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.expense = state.expense.filter(exp => exp.id !== action.payload);
            })
            .addCase(deleteExpense.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.deleteErr = action.payload;
            })
    }
})

// export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;