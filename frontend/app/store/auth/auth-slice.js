import { createSlice } from "@reduxjs/toolkit";
import { forgotPass, login, resetPass, signUp } from "./auth-action";

const initalAuthState = {
    user: null,
    token: null,
    loginStatus: 'idle',
    signUpStatus: 'idle',
    forgotStatus: 'idle',
    resetStatus: 'idle',
    loginErr: null,
    signUpErr: null,
    forgotErr: null,
    resetErr: null,
};


const authSlice = createSlice({
    name: "auth",
    initialState: initalAuthState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;

            if (typeof window !== "undefined") {
                localStorage.clear();
                sessionStorage.clear();
            }
        },
        hydrateFromStorage(state) {
            if (typeof window !== "undefined") {
                const storage = localStorage.getItem("token") ? localStorage : sessionStorage;

                const user = storage.getItem("user");
                const token = storage.getItem("token");

                state.user = user ? JSON.parse(user) : null;
                state.token = token || null;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loginStatus = 'pending';
                state.loginErr = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginStatus = 'fulfilled';
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginErr = action.payload.message;
                state.loginStatus = 'failed';
            })

            .addCase(signUp.pending, (state) => {
                state.signUpStatus = 'pending';
                state.signUpErr = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUpStatus = 'fulfilled';
            })
            .addCase(signUp.rejected, (state, action) => {
                state.signUpErr = action.payload.message;
                state.signUpStatus = 'failed';
            })

            .addCase(forgotPass.pending, (state) => {
                state.forgotStatus = 'pending';
                state.forgotErr = null;
            })
            .addCase(forgotPass.fulfilled, (state,action) => {
                state.forgotStatus = 'fulfilled';
            })
            .addCase(forgotPass.rejected, (state,action) => {
                state.forgotStatus = 'failed';
                state.forgotErr = action.payload.message;
            })

            .addCase(resetPass.pending, (state) => {
                state.resetStatus = 'pending';
                state.resetErr = null;
            })
            .addCase(resetPass.fulfilled, (state,action) => {
                state.resetStatus = 'fulfilled';
            })
            .addCase(resetPass.rejected, (state,action) => {
                state.resetStatus = 'failed';
                state.resetErr = action.payload.message;
            })

    }
})


export const { logout, hydrateFromStorage } = authSlice.actions;

export default authSlice.reducer;