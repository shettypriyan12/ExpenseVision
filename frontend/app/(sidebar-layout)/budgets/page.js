'use client';

import React, { useEffect, useMemo, useState } from 'react';
import c from './Budget.module.css';
import { Plus } from 'lucide-react';
import Budget2 from './Budget2';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBudget } from '@/app/store/budgets/budget-action';
import { format } from 'date-fns';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import BudgetForm from './BudgetForm';

export default function Budget() {

    const [showForm, setShowForm] = useState(false);
    const expense = useSelector((state) => state.expense.expense);
    const budget = useSelector((state) => state.budget.budget);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExpense());
        dispatch(getAllBudget());
    }, [dispatch]);


    const budGet = useMemo(() => {
        if (!budget?.length) return [];


        const currentMonth = format(new Date(), 'yyyy-MM');

        const monthlyBudgets = budget.filter(
            (b) => format(new Date(b.month), 'yyyy-MM') === currentMonth
        );

        const totalBudget = monthlyBudgets.reduce((sum, b) => sum + b.amount, 0).toFixed(2);

        const totalSpent = monthlyBudgets.reduce((sum, b) => {
            const spent = expense
                .filter((e) => e.CategoryId === b.CategoryId)
                .filter((e) => format(new Date(e.date), 'yyyy-MM') === currentMonth)
                .reduce((catSum, e) => catSum + e.amount, 0);

            return sum + spent;
        }, 0).toFixed(2);

        const totalRemaining = (totalBudget - totalSpent).toFixed(2);

        return { totalBudget, totalSpent, totalRemaining };
    }, [budget, expense]);


    const totalBudget = budGet.totalBudget;
    const totalSpent = budGet.totalSpent;
    const totalRemaining = budGet.totalRemaining;

    return (
        <>
            <section className={c.budgets}>

                <div className='flex py-2 flex-col sm:flex-row items-center justify-between '>
                    <h1>budgets</h1>

                    <button
                        onClick={() => setShowForm((visible) => !visible)}
                        className={`capitalize h-fit text-center text-[var(--background)] rounded-[10px] shadow-md active:scale-x-[.98] active:scale-y-95 
                                    flex items-center gap-1.5 cursor-pointer ${c.transbtn}`}>
                        <Plus size={16} strokeWidth={3} className='text-var[--background]' /> new budget
                    </button>
                </div>

                {showForm && <BudgetForm onClose={() => setShowForm(false)} />}

                <section className={c.budgetInfo}>
                    <h2>monthly budget overview</h2>

                    <Budget2 />
                </section>

                <section className={`${c.totalAll}`}>
                    <h2>budget summary</h2>

                    <div className={`mt-5 flex flex-col sm:flex-row gap-5`}>
                        <div className={`w-full md:w-1/2 text-center bg-[var(--background)] ${c.totalCard}`}>
                            <h3 className='text-[20px] text-[var(--foreground)] font-[600] capitalize'>total budget</h3>
                            <h2 className='text-[var(--theme1)]'>₹{Number(totalBudget).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </div>
                        <div className={`w-full md:w-1/2 text-center bg-[var(--background)] ${c.totalCard}`}>
                            <h3 className='text-[20px] text-[var(--foreground)] font-[600] capitalize'>total spent</h3>
                            <h2 className='text-[#FF0800]'>₹{Number(totalSpent).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </div>
                        <div className={`w-full md:w-1/2 text-center bg-[var(--background)] ${c.totalCard}`}>
                            <h3 className='text-[20px] text-[var(--foreground)] font-[600] capitalize'>total remaining</h3>
                            <h2 className='text-[#34D399]'>₹{Number(totalRemaining).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                        </div>

                    </div>
                </section>

            </section>
        </>
    );
};

