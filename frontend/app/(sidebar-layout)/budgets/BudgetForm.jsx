'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import c from './BudgetForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addBudget } from '@/app/store/budgets/budget-action';
import { getAllCategory } from '@/app/store/categories/category-action';


const BudgetForm = ({ onClose }) => {

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const validationSchema = Yup.object({
        categoryId: Yup.string().required('Category is required'),
        amount: Yup.number()
            .typeError('Amount must be a number')
            .positive('Amount must be positive')
            .required('Amount is required'),
        month: Yup.date().required('Date is required'),
    });

    return (
        <>
            <section className={c.budgetForm}>
                <h2>Create your budget</h2>

                <Formik
                    initialValues={{ categoryId: '', amount: '', month: '', }}

                    validationSchema={validationSchema}

                    onSubmit={(values, { resetForm }) => {

                        dispatch(addBudget({
                            ...values,
                            amount: Number(values.amount), 
                        }));
                        resetForm();
                        console.log(values);
                    }}>
                    {({ isSubmitting }) => (
                        <Form
                            className="flex flex-col md:flex-row justify-between rounded-lg shadow-md p-6 mt-5 "
                        >
                            <div className="md:w-1/4 mb-4">
                                <label className="block text-sm font-medium">Amount</label>
                                <Field type="number" name="amount"
                                    placeholder="0.00"
                                    className="w-full outline-0 border rounded p-2 active:border-[var(--theme1)]"
                                />
                                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="md:w-1/4 mb-4">
                                <label className="block text-sm font-medium">Start date of month</label>
                                <Field type="date" name="month"
                                    className="w-full border rounded p-2"
                                />
                                <ErrorMessage name="month" component="div" className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="md:w-1/4 mb-4">
                                <label className="block text-sm font-medium">Category</label>
                                <Field as="select" name="categoryId"
                                    className={`w-full border rounded p-2 ${c.selectable}`}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="categoryId" component="div" className="text-red-500 text-sm"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 h-fit rounded bg-[#FF0800] text-white cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-4 py-2 h-fit rounded bg-[#1fc789] text-white cursor-pointer"
                                >
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </section>
        </>
    );
};

export default BudgetForm;