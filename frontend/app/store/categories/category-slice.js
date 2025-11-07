import { createSlice } from "@reduxjs/toolkit";
import { addCategory, getAllCategory } from "./category-action";

const initialCategoryState = {
    categories: [],
    status: "idle",
    addStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
    addErr: null,
    updateErr: null,
    deleteErr: null,
}


const categoriesSlice = createSlice({
    name: "category",
    initialState: initialCategoryState,
    // reducers: {},
    extraReducers: (builder) => {
        builder //all
            .addCase(getAllCategory.pending, (state) => {
                state.status = "pending"
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.categories = action.payload;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            }) //add
            .addCase(addCategory.pending, (state) => {
                state.addStatus = "pending"
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.addStatus = "fulfilled";
                state.categories = action.payload;
            })
            .addCase(addCategory.rejected, (state, action) => {
                state.addStatus = "rejected";
                state.addErr = action.payload;
            })
    }
})

// export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice.reducer;