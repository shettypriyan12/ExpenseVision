'use client';

import React, { useEffect, useMemo } from 'react';
import c from './Transaction.module.css'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIncome } from '@/app/store/incomes/incomes-action';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { format } from 'date-fns';
import { categoryMap, normalizeCategory } from '@/app/utils/categorymap';

export default function Transaction() {

    const incomes = useSelector((state) => state.income.income || []);
    const expenses = useSelector((state) => state.expense.expense || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExpense());
        dispatch(getAllIncome());
    }, [dispatch]);

    // ✅ Combine & sort incomes + expenses
    const transactions = useMemo(() => {
        const mappedIncomes = incomes.map((i) => ({
            id: `inc-${i.id}`,
            type: "income",
            notes: i.notes || "Income",
            merchant: i.merchant || "Income",
            category: i.Category?.name || "Income",
            amount: i.amount,
            date: new Date(i.date),
        }));

        const mappedExpenses = expenses.map((e) => ({
            id: `exp-${e.id}`,
            type: "expense",
            notes: e.notes || "Expense",
            merchant: e.merchant,
            category: e.Category?.name || "Other",
            amount: e.amount,
            date: new Date(e.date),
        }));

        const now = new Date();
        return [...mappedIncomes, ...mappedExpenses]
            .filter((tx) => tx.date <= now)
            .sort((a, b) => b.date - a.date);
    }, [incomes, expenses]);

    return (
        <>
            <section className={c.transaction}>

                <div className='flex py-2 flex-col sm:flex-row items-center justify-between'>
                    <h1>transactions</h1>

                    <Link className={`capitalize h-fit text-center rounded-[10px] shadow-md active:scale-x-[.98] active:scale-y-95 
                                    ${c.transbtn}`}
                        href={`/dashboard#transactionForm`}
                    >
                        add new transaction
                    </Link>
                </div>

                <section className={c.transactionTable}>
                    <h2>recent transactions</h2>

                    <div className='p-1 md:p-5 h-[100vh] overflow-y-scroll overflow-x-auto '>
                        <table className="w-full rounded-lg ">
                            <thead className="">
                                <tr>
                                    <th className="min-w-[130px] text-left px-1 md:px-4 py-3 text-[var(--border2)]">Date</th>
                                    <th className="min-w-[165px] text-left px-1 md:px-4 py-3 text-[var(--border2)]">Description</th>
                                    <th className="min-w-[164px] text-left px-1 md:px-4 py-3 text-[var(--border2)]">Category</th>
                                    <th className="min-w-[128px] text-left px-1 md:px-4 py-3 text-[var(--border2)]">Vendor</th>
                                    <th className="min-w-[99px] text-right px-1 md:px-4 py-3 text-[var(--border2)]">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => {
                                    const catKey = normalizeCategory(tx.category);
                                    const cat = categoryMap[catKey] || categoryMap.other;
                                    const Icon = cat.icon;

                                    return (
                                        <tr key={tx.id} className="border-t-[.5px] border-[var(--border2)]">
                                            <td className="px-1 md:px-4 py-3.5 text-[15px] font-semibold">{format(tx.date, "MMM dd, yyyy")}</td>
                                            <td className="px-1 md:px-4 py-3.5 text-[15px] font-semibold">{tx.notes}</td>
                                            <td className="px-1 md:px-4 py-3.5 text-[15px] font-semibold flex items-center gap-2">
                                                <Icon size={16} className={cat.color} />
                                                {tx.category}
                                            </td>
                                            <td className="px-1 md:px-4 py-3.5 text-[15px] font-semibold">{tx.merchant}</td>
                                            <td
                                                className={`px-1 md:px-4 py-3.5 text-[15px] text-right font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                {tx.type === "income"
                                                    ? `+$${Math.abs(tx.amount)}`
                                                    : `-$${Math.abs(tx.amount)}`}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>

                </section>


            </section >
        </>
    );
};
