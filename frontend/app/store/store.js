import { legacy_createStore as createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from '@/app/store/users/users-slice';
import incomeReducer from '@/app/store/incomes/incomes-slice';
import expenseReducer from '@/app/store/expenses/expenses-slice';
import categoryReducer from '@/app/store/categories/category-slice';
import authReducer from '@/app/store/auth/auth-slice';
import budgetReducer from '@/app/store/budgets/budget-slice';

const store = configureStore({
    reducer: {
        users: userReducer,
        income: incomeReducer,
        expense: expenseReducer,
        categories: categoryReducer,
        auth: authReducer,
        budget: budgetReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,   
            serializableCheck: false 
        }),
});

export default store;