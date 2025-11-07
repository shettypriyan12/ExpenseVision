'use client';

import React, { useEffect, useMemo } from 'react';
import c from './Budget.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBudget, deleteBudget } from '@/app/store/budgets/budget-action';
import { format } from 'date-fns';
import { OctagonAlert, Trash2 } from 'lucide-react';
import SettingLoader from '@/components/loaders/settingloader';
import { getAllExpense } from '@/app/store/expenses/expenses-action';

const Budget2 = () => {

    const expense = useSelector((state) => state.expense.expense);
    const { budget, status, error } = useSelector((state) => state.budget);
    const dispatch = useDispatch();

    // console.log(budget);
    // console.log(error);

    useEffect(() => {
        dispatch(getAllExpense());
        dispatch(getAllBudget());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this budget?")) {
            dispatch(deleteBudget(id));
        }
    };

    const budgetWithSpent = useMemo(() => {
        if (!budget?.length) return [];

        const currentMonth = format(new Date(), "yyyy-MM");
        // console.log(currentMonth);
        

        return budget.filter((b) => format(new Date(b.month), "yyyy-MM") === currentMonth)
            .map((b) => {
                const spent = expense
                    .filter((e) => e.CategoryId === b.CategoryId)
                    .filter((e) => format(new Date(e.date), "yyyy-MM") === currentMonth)
                    .reduce((sum, e) => sum + e.amount, 0);

                // console.log(b);

                const percent = b.amount > 0 ? ((spent / b.amount) * 100).toFixed(1) : 0;

                let color = "bg-green-500";
                if (percent >= 95) color = "bg-red-500";
                else if (percent >= 85) color = "bg-yellow-400";

                const remaining = b.amount - spent;

                return {
                    ...b,
                    spent,
                    color,
                    remaining,
                    percent: percent > 100 ? 100 : percent,
                };
            });
    }, [budget, expense]);

    return (
        <>
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
                                <Trash2
                                    className="ml-1 cursor-pointer text-gray-400 hover:text-red-500"
                                    size={17} color="#ff0000" strokeWidth={1.75}
                                    onClick={() => handleDelete(b.id)} />
                            </p>
                        </div>

                        <div className="my-2 h-[14px] relative bg-gray-300 rounded-[20px] overflow-hidden">
                            <div
                                className={`h-full ${b.color} `}
                                style={{ width: `${b.percent}%` }}
                            />
                        </div>

                        <div className='flex items-center justify-between'>
                            <p className='text-[13px] '>{b.percent}% spent</p>
                            <p className='text-[13px] '>
                                {b.remaining < 0
                                    ? `Overspent: ₹${Math.abs(b.remaining)}`
                                    : `Amount left: ₹${b.remaining}`
                                }
                            </p>
                        </div>
                    </div>
                ))}

                {status === "fulfilled" && budgetWithSpent.length <= 0 && (
                        <p className='text-lg text-[#1100ff] first-letter:capitalize'> Create a budget for this month  </p>
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
        </>
    );
};

export default Budget2;