'use client';

import React, { useEffect, useMemo } from 'react';
import c from './Budget1.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBudget } from '@/app/store/budgets/budget-action';
import SettingLoader from '@/components/loaders/settingloader';
import { OctagonAlert } from 'lucide-react';
import { format, subMonths } from 'date-fns';

const Budget1 = () => {
    const expense = useSelector((state) => state.expense.expense);
    const { budget, status, error } = useSelector((state) => state.budget);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllBudget());
    }, [dispatch]);

    const budgetWithSpent = useMemo(() => {
        if (!budget?.length) return [];

        const prevMonth = format(subMonths(new Date(), 1), "yyyy-MM");

        // only previous month
        return budget.filter((b) => format(new Date(b.month), "yyyy-MM") === prevMonth)
            .map((b) => {
                const spent = expense
                    .filter((e) => e.CategoryId === b.CategoryId)
                    .filter((e) => format(new Date(e.date), "yyyy-MM") === prevMonth)
                    .reduce((sum, e) => sum + e.amount, 0);

                // console.log(spent);

                const percent = b.amount > 0 ? (spent / b.amount) * 100 : 0;

                let color = "bg-green-500";
                if (percent >= 95) color = "bg-red-500";
                else if (percent >= 85) color = "bg-yellow-400";

                return {
                    ...b,
                    spent,
                    percent: percent > 100 ? 100 : percent,
                    color,
                };
            });
    }, [budget, expense]);

    // console.log(budgetWithSpent);

    return (
        <>
            <section className={`${c.budget1}`}>
                <h2 className="text-[20px] font-bold tracking-[-.5px] capitalize">
                    previous budget overview
                </h2>

                <div className={`py-4 w-full text-center ${c.budgetCards}`}>
                    {status === "fulfilled" && budgetWithSpent.map((b) => (
                        <div key={b.id} className={`my-4 ${c.card}`}>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-base">{b.Category?.name}</h3>
                                <p className='flex items-center justify-center gap-0.5'>
                                    <span className="font-bold text-md">₹{b.spent}</span> /{" "}
                                    <span className='text-sm'>₹{b.amount}</span>
                                    {b.percent >= 100 && (
                                        <OctagonAlert className='ml-1' size={17} color="#ff0000" strokeWidth={1.75} />
                                    )}
                                </p>
                            </div>

                            <div className="my-2 h-[6px] relative bg-gray-300 rounded-[20px] overflow-hidden">
                                <div
                                    className={`h-full ${b.color}`}
                                    style={{ width: `${b.percent}%` }}
                                />
                            </div>
                        </div>
                    ))}

                    {status === "fulfilled" && budgetWithSpent.length <= 0 && (
                        <p className='text-lg text-[#1100ff] first-letter:capitalize'> No budget made for the previous month </p>
                    )}

                    {status === "pending" && (
                        <>
                            <SettingLoader />
                        </>
                    )}

                    {status === "rejected" && (
                        <p className='text-lg text-[#FF0800] first-letter:capitalize'> Login to your account / Create a budget for this month </p>
                    )}
                </div>
            </section>

        </>
    );
};

export default Budget1;
