'use client';

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import c from './Transaction1.module.css';
import { normalizeCategory, formatDate, categoryMap } from '@/app/utils/categorymap';
import { getAllExpense } from '@/app/store/expenses/expenses-action';
import { getAllIncome } from '@/app/store/incomes/incomes-action';
import Link from 'next/link';


const Transaction1 = () => {

    const incomes = useSelector((state) => state.income.income || []);
    const expenses = useSelector((state) => state.expense.expense || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllExpense());
        dispatch(getAllIncome());
    }, []);

    // ✅ Combine & sort
    const transactions = useMemo(() => {
        const mappedIncomes = incomes.map((i) => ({
            id: `inc-${i.id}`,
            type: "income",
            merchant: i.merchant || "Income",
            category: i.Category?.name || "Income",
            amount: i.amount,
            date: new Date(i.date),
        }));

        const mappedExpenses = expenses.map((e) => ({
            id: `exp-${e.id}`,
            type: "expense",
            merchant: e.merchant,
            category: e.Category?.name || "Other",
            amount: e.amount,
            date: new Date(e.date),
        }));

        const now = new Date();
        return [...mappedIncomes, ...mappedExpenses]
            .filter((tx) => tx.date <= now) // exclude future dates
            .sort((a, b) => b.date - a.date)
            .slice(0, 5);
    }, [incomes, expenses]);

    return (
        <section className={`${c.transaction1}`}>
            <h2 className="text-[20px] font-bold tracking-[-.5px] capitalize">
                recent transactions
            </h2>

            <div className={`mt-2 ${c.transCards}`}>
                {transactions.map((tx) => {
                    const catKey = normalizeCategory(tx.category);
                    const cat = categoryMap[catKey] || categoryMap.other;
                    const Icon = cat.icon;

                    return (
                        <div
                            key={tx.id}
                            className={`py-2.5 sm:px-2 flex justify-between ${c.card}`}
                        >
                            <div className={`flex items-center gap-2.5 ${c.cleft}`}>
                                <Icon size={38} className={cat.color} strokeWidth={2} />
                                <div className={c.clrght}>
                                    <h2 className="text-[17px] font-bold tracking-[-.1px]">
                                        {tx.merchant}
                                    </h2>
                                    <p className="text-sm font-[600] tracking-[-.5px]">
                                        {tx.category}
                                    </p>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className={`text-end ${c.cright}`}>
                                <h2
                                    className={`text-[17px] font-bold tracking-[-.4px] ${tx.type === "expense" ? "text-red-500" : "text-green-500"
                                        }`}
                                >
                                    {tx.type === "expense" ? "-" : "+"}₹{tx.amount}
                                </h2>
                                <p className="text-sm font-[500] tracking-[-.5px]">
                                    {formatDate(tx.date)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <Link className={`w-full block text-center rounded-[10px] shadow-md active:scale-x-[.98] active:scale-y-95 
                ${c.transbtn}`} 
                href={`/transactions`} 
                >
                View all transactions
            </Link>
        </section>
    );
};

export default Transaction1;

