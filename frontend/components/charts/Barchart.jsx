'use client';

import React, { useEffect, useState, useMemo } from 'react';
import c from './Barchart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllIncome } from '@/app/store/incomes/incomes-action';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { prepareBarChartData } from '@/app/utils/prepareChart';

const Barchart = () => {

    const [mode, setMode] = useState("monthly");

    const { income, status: istatus, error: ierror } = useSelector(state => state.income);
    // console.log(income);
    const { expense, status: estatus, error: eerror } = useSelector(state => state.expense);
    // console.log(expense);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllIncome());
        dispatch(getAllExpense());
    }, [])

    const chartdata = useMemo(() => 
        prepareBarChartData(income, expense, mode)
    , [income, expense, mode]);

    return (
        <>
            <section className={c.barChart}>
                <h2>expense analytics</h2>

                <div className={c.toggleSpan}>
                    <button
                        className={`${mode === "weekly" ? c.active : ""}`}
                        onClick={() => setMode("weekly")}
                    >weekly</button>
                    <button
                        className={`${mode === "monthly" ? c.active : ""}`}
                        onClick={() => setMode("monthly")}
                    >monthly</button>
                </div>

                <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={chartdata}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" domain={[0, dataMax => dataMax + 10000]}  />
                        <Tooltip
                            contentStyle={{ backgroundColor: "var(--frontback)", borderRadius: "10px", border: "1px solid #ddd" }}
                            labelStyle={{ fontWeight: "600", textTransform: 'uppercase' }}
                        />
                        <Legend />
                        <Bar dataKey="Expense" fill="#FF0800" radius={[3,3, 0, 0]} />
                        <Bar dataKey="Income" fill="#228B22" radius={[3,3, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </section>
        </>
    );
};

export default Barchart;