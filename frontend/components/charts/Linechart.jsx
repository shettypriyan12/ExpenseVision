'use client';

import React, { useEffect, useMemo } from 'react';
import c from './Linechart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { getAllIncome } from '@/app/store/incomes/incomes-action';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import prepareLineChartData from '@/app/utils/prepareChart';

const Linechart = () => {

    const income = useSelector((state) => state.income.income);
    const expense = useSelector((state) => state.expense.expense);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllIncome());
        dispatch(getAllExpense());
    }, []);

    // console.log(income);
    // console.log(expense);
    

    const chartdata = prepareLineChartData(income, expense);
    // console.log(chartdata);
    
    // const chartdata = useMemo(() =>
    //     prepareLineChartData(income, expense)
    //     , [income, expense]);

    return (
        <>
            <section className={`w-full ${c.lineChart}`}>
                <h2>income VS expenses trend</h2>

                <ResponsiveContainer width="100%" height={340} className={`py-4`}>
                    <LineChart data={chartdata} >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" domain={[0, dataMax => dataMax + 10000]}  />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Income" stroke="#16a34a" strokeWidth={2} />
                        <Line type="monotone" dataKey="Expense" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </>
    );
};

export default Linechart;