import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUser } from "./users-action";


const initialUserState = {
    users: [],
    user: [],
    status: 'idle',
    // searchedStatus:'idle',
    error: null,
    // searchedErr: null,
}

const usersSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    // reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            })
            .addCase(getUser.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.user = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload;
            });
    },
})

// export const usersActions = usersSlice.actions;

export default usersSlice.reducer;