import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosHttp from "@/app/utils/axiosHttp";
import { jwtDecode } from "jwt-decode";

export const signUp = createAsyncThunk("auth/signUp", async (userData, { rejectWithValue }) => {

    try {

        const res = await axiosHttp.post("/sign-up", userData);
        return res.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Sign up failed" });
    }
});

export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {

    try {
        const res = await axiosHttp.post("/login", credentials);

        const token = res.data.token
        const decoded = jwtDecode(token);

        if (typeof window !== "undefined") {
            if (credentials.rememberMe) {
                localStorage.setItem("token", token);
                localStorage.setItem("tokenExpiry", decoded.exp * 1000);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("tokenExpiry", decoded.exp * 1000);
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
            } else {
                sessionStorage.setItem("token", token);
                sessionStorage.setItem("tokenExpiry", decoded.exp * 1000);
                sessionStorage.setItem("user", JSON.stringify(res.data.user));
            }
        }

        return res.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
});

export const forgotPass = createAsyncThunk("auth/forgotPassword", async (values, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post("/forgot-password", values);
        return res.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Email incorrect" });
    }
});

export const resetPass = createAsyncThunk("auth/resetPassword", async ({token, password}, { rejectWithValue }) => {
    try {
        const res = await axiosHttp.post(`/reset-password?token=${token}`, {password});
        return res.data;

    } catch (err) {
        return rejectWithValue(err.response?.data || { message: "Invalid data" });
    }
});