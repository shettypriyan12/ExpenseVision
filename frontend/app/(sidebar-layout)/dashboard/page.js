'use client';

import React, { useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import c from './Dashboard.module.css'
import { getFinanceSummary } from '@/app/utils/finance';
import Barchart from '@/components/charts/Barchart';
import { useDispatch, useSelector } from 'react-redux';
import Budget1 from './Budget1';
import TransactionForm from './TransactionForm';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { getAllIncome } from '@/app/store/incomes/incomes-action';
import Transaction1 from './Transaction1';

export default function Dashboard() {

    const incomes = useSelector((state) => state.income.income);
    const expenses = useSelector((state) => state.expense.expense);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExpense());
        dispatch(getAllIncome());
    }, [dispatch]);


    // console.log(incomes);
    // console.log(expenses);

    const summary = getFinanceSummary(incomes, expenses);
    const { income, expense, savings } = summary.currentMonth;
    const totalBalance = summary.totalBalance;



    return (
        <>
            <section className={c.dashboard}>
                <h1>dashboard</h1>

                <section className={c.cards}>
                    <div className={c.card}>
                        <h5>total balance</h5>
                        <h3>₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        <p>Balance of past 6 till this month</p>
                        <span><DollarSign size={16} color="grey" strokeWidth={2.5} /></span>
                    </div>
                    <div className={c.card}>
                        <h5>income</h5>
                        <h3 className='green'>₹{income.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        <p><ArrowUpRight size={12} color="#34D399" strokeWidth={1.75} />This month</p>
                        <span><TrendingUp size={16} color="#34D399" strokeWidth={1.75} /></span>
                    </div>
                    <div className={c.card}>
                        <h5>expenses</h5>
                        <h3 className='red'>₹{expense.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        <p><ArrowDownRight size={12} color="red" strokeWidth={1.75} />This month</p>
                        <span><TrendingDown size={16} color="red" strokeWidth={1.75} /></span>
                    </div>
                    <div className={c.card}>
                        <h5>savings</h5>
                        <h3 className='base'>₹{savings.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                        <p>{((savings / income) * 100).toFixed(1)}% saved this month</p>
                        <span><PiggyBank size={16} color="#4e46e5b3" strokeWidth={1.75} /></span>
                    </div>
                </section>

                <Barchart />

                <Budget1 />

                <TransactionForm />

                <Transaction1/>
            </section>

        </>
    );
};
