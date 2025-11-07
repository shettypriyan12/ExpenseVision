import { createSlice } from "@reduxjs/toolkit";
import { addBudget, getAllBudget, updateBudget, deleteBudget } from "./budget-action";

const initialBudgetState = {
    budget: [],
    status: "idle",
    addStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
    addErr: null,
    updateErr: null,
    deleteErr: null,
}


const budgetSlice = createSlice({
    name: "budget",
    initialState: initialBudgetState,
    // reducers: {},
    extraReducers: (builder) => {
        builder //all
            .addCase(getAllBudget.pending, (state) => {
                state.status = "pending"
            })
            .addCase(getAllBudget.fulfilled, (state, action) => {
                state.status = "fulfilled";
                // console.log("Reducer payload:", action.payload);
                state.budget = action.payload;
            })
            .addCase(getAllBudget.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            }) //add
            .addCase(addBudget.pending, (state) => {
                state.addStatus = "pending"
            })
            .addCase(addBudget.fulfilled, (state, action) => {
                state.addStatus = "fulfilled";
                state.budget = action.payload;
            })
            .addCase(addBudget.rejected, (state, action) => {
                state.addStatus = "rejected";
                state.addErr = action.payload;
            }) //update
            .addCase(updateBudget.pending, (state) => {
                state.updateStatus = "pending"
            })
            .addCase(updateBudget.fulfilled, (state, action) => {
                state.updateStatus = "fulfilled";
                state.budget = action.payload;
            })
            .addCase(updateBudget.rejected, (state, action) => {
                state.updateStatus = "rejected";
                state.updateErr = action.payload;
            }) //delete
            .addCase(deleteBudget.pending, (state) => {
                state.deleteStatus = "pending"
            })
            .addCase(deleteBudget.fulfilled, (state, action) => {
                state.deleteStatus = "fulfilled";
                state.budget = action.payload;
            })
            .addCase(deleteBudget.rejected, (state, action) => {
                state.deleteStatus = "rejected";
                state.deleteErr = action.payload;
            })
    }
})

// export const budgetActions = budgetSlice.actions;

export default budgetSlice.reducer;