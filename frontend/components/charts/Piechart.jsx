'use client';

import React, { useEffect } from 'react';
import c from './Piechart.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { preparePieChartData } from '@/app/utils/prepareChart';

const COLORS = [
    '#4F46E5', // Indigo
    '#F59E0B', // Amber
    '#10B981', // Green
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#6366F1', // Indigo 500
    '#F97316', // Orange 500
    '#22C55E', // Emerald 500
    '#EAB308', // Yellow 500
    '#0EA5E9', // Sky 500
    '#A855F7', // Violet 500
    '#D946EF', // Fuchsia 500
    '#F43F5E', // Rose 500
    '#06B6D4', // Cyan 500
    '#84CC16', // Lime 500
    '#FACC15', // Yellow 400
    '#64748B', // Slate 500
    '#F87171', // Red 400
    '#34D399', // Green 400
    '#60A5FA', // Blue 400
];

const renderCustomLabel = ({ name, percent }) => (
    <text
        fill="#333"
        fontSize="10"
        textAnchor="middle"
        dominantBaseline="central"
    >
        {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
);

const Piechart = () => {

    const expense = useSelector((state) => state.expense.expense);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExpense());
    }, []);

    const piedata = preparePieChartData(expense);

    return (
        <>
            <section className={`w-full ${c.pieChart}`}>
                <h2>expense by category</h2>

                <ResponsiveContainer width="100%" height={340} className={`py-4 flex`}>
                    <PieChart>
                        <Pie
                            data={piedata}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {piedata.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value}`} contentStyle={{ fontSize: '12px' }} />
                        <Legend
                            wrapperStyle={{ fontSize: '14px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

            </section>
        </>
    );
};

export default Piechart;