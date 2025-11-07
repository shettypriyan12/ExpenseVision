'use client';

import React, { useEffect } from 'react';
import c from './Reports.module.css';
import Barchart from '@/components/charts/Barchart';
import Piechart from '@/components/charts/Piechart';
import Linechart from '@/components/charts/Linechart';

import { useDispatch, useSelector } from 'react-redux';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { getAllIncome } from '@/app/store/incomes/incomes-action';
import { getFinanceSummary } from '@/app/utils/finance';

export default function Reports() {

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
    const netSavings = summary.last6Saving;
    const totalIncome = summary.last6Income;
    const totalExpense = summary.last6Expense;

    // console.log(summary);


    return (
        <>
            <section className={c.reports}>
                <h1>reports</h1>

                <Barchart />

                <div className='flex flex-col xl:flex-row gap-[3%] w-full'>
                    <Piechart />

                    <Linechart />
                </div>

                <section className={`${c.totalAll}`}>
                    <h2>financial summary</h2>

                    <div className={`mt-5 flex flex-col sm:flex-row gap-3`}>
                        <div className={`w-full md:w-1/2 bg-[var(--theme7)] ${c.totalCard}`}>
                            <h3 className='text-[18px] text-blue-500 font-[600] capitalize'>total income</h3>
                            <p className=''>₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>                            
                            <span className='capitalize text-[14px] font-[600] text-[var(--foreground)]'> last 6 months</span>
                        </div>
                        <div className={`w-full md:w-1/2 bg-[var(--theme6)] ${c.totalCard}`}>
                            <h3 className='text-[18px] text-[#FF0800] font-[600] capitalize'>total expense</h3>
                            <p className=''>₹{totalExpense.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>                            
                            <span className='capitalize text-[14px] font-[600] text-[var(--foreground)]'> last 6 months</span>
                        </div>
                        <div className={`w-full md:w-1/2 bg-[var(--theme5)] ${c.totalCard}`}>
                            <h3 className='text-[18px] text-green-600 font-[600] capitalize'>net savings</h3>
                            <p className=''>₹{netSavings.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>                            
                            <span className='capitalize text-[14px] font-[600] text-[var(--foreground)]'> last 6 months</span>
                        </div>

                    </div>
                </section>
            </section>
        </>
    );
};
