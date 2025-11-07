'use client';

import React, { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import c from './TransactionForm.module.css';
import { Plus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome } from '@/app/store/incomes/incomes-action';
import { addExpense } from '@/app/store/expenses/expenses-action';

import { getAllCategory } from '@/app/store/categories/category-action';

const TransactionForm = () => {

    const [user, setUser] = useState();
    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();
    // console.log(categories);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        dispatch(getAllCategory());
    }, [dispatch]);

    // console.log(user);


    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Transaction type is required'),
        category: Yup.string().required('Category is required'),
        customCategory: Yup.string().when('category', {
            is: 'other',
            then: (schema) => schema.required('Category is required'),
            otherwise: (schema) => schema.notRequired(),
        }),
        amount: Yup.number()
            .typeError('Amount must be a number')
            .positive('Amount must be positive')
            .required('Amount is required'),
        date: Yup.date().required('Date is required'),
        merchant: Yup.string().max(50, 'Too long').required('Required'),
        notes: Yup.string().max(200, 'Too long'),
    });

    return (
        <>
            <section id='transactionForm' className={`${c.transactionContainer}`}>
                <h2 className="text-[20px] font-bold tracking-[-.5px] capitalize">
                    add new transaction
                </h2>

                <div className={`${c.transactionForm}`}>
                    <Formik
                        initialValues={{ type: 'expense', category: '', customCategory: '', amount: '', date: '', merchant: '', notes: '', }}

                        validationSchema={validationSchema}

                        onSubmit={(values, { resetForm }) => {

                            const finalCategory =
                                values.category === 'other' ? values.customCategory : values.category;

                            const data = {
                                // userId: user?.id,
                                type: values.type,
                                categoryName: finalCategory,
                                amount: Number(values.amount),
                                date: values.date,
                                merchant: values.merchant,
                                notes: values.notes,
                            };

                            if (values.type === 'income') {
                                dispatch(addIncome(data));
                                console.log(data);

                            } else {
                                dispatch(addExpense(data));
                                console.log(data);

                            }

                            resetForm();
                        }}
                    >
                        {({ values, setFieldValue }) => (
                            <Form className=" space-y-4 py-4 md:p-4 w-full">
                                <div className='flex flex-wrap justify-between '>
                                    <div className='w-full md:w-[23.5%] lg:w-[23.5%]  
                                                    my-2'
                                    >
                                        <label className="block mb-1 font-semibold">Transaction Type</label>
                                        <Field
                                            as="select"
                                            name="type"
                                            className={`w-full border-1 border-neutral-400 !p-2 rounded shadow-md ${c.selectable}`}
                                            onChange={(e) => {
                                                setFieldValue('type', e.target.value);
                                                setFieldValue('category', '');
                                            }}
                                        >
                                            <option value="expense">Expense</option>
                                            <option value="income">Income</option>
                                        </Field>
                                        <ErrorMessage name="type" component="div" className="ml-1 my-2 text-red-500 text-sm" />
                                    </div>

                                    <div className='w-full md:w-[23.5%] lg:w-[23.5%]  
                                                    my-2'
                                    >
                                        <label className="block mb-1 font-semibold">Category</label>

                                        {values.category === 'other' ? (
                                            <div>
                                                <Field
                                                    type="text"
                                                    name="customCategory"
                                                    placeholder="Enter new category"
                                                    className={`w-full border-1 border-neutral-400 !p-2 rounded shadow-md ${c.selectable}`}
                                                />
                                            </div>
                                        ) : (
                                            <Field
                                                as="select"
                                                name="category"
                                                className={`w-full border-1 border-neutral-400 !p-2 rounded shadow-md ${c.selectable}`}
                                            >
                                                <option disabled value="">Select category</option>
                                                {categories
                                                    .filter((c) => c.type === values.type)
                                                    .map((cat) => (
                                                        <option key={cat.id} value={cat.name}>
                                                            {cat.name}
                                                        </option>
                                                    ))}
                                                <option value="other">Other</option>
                                            </Field>
                                        )}

                                        <ErrorMessage name={values.category === 'other' ? 'customCategory' : 'category'}
                                            component="div" className="ml-1 my-2 text-red-500 text-sm" />
                                    </div>

                                    <div className='w-full md:w-[23.5%] lg:w-[23.5%]  
                                                    my-2'
                                    >
                                        <label className="block mb-1 font-semibold">Amount</label>
                                        <Field
                                            type="number"
                                            name="amount"
                                            placeholder="0.00"
                                            className={`w-full border-1 border-neutral-400 !p-2 rounded shadow-md ${c.selectable}`}
                                        />
                                        <ErrorMessage name="amount" component="div" className="ml-1 my-2 text-red-500 text-sm" />
                                    </div>

                                    <div className='w-full md:w-[23.5%] lg:w-[23.5%]  
                                                    my-2'
                                    >
                                        <label className="block mb-1 font-semibold">Date</label>
                                        <Field
                                            type="date"
                                            name="date"
                                            className={`w-full border-1 border-neutral-400 p-2! rounded shadow-md ${c.selectable}`} />
                                        <ErrorMessage name="date" component="div" className="ml-1 my-2 text-red-500 text-sm" />
                                    </div>
                                </div>

                                <div className='flex flex-wrap justify-between'>
                                    <div className=' w-full md:w-[48.5%]
                                    my-2'
                                    >
                                        <label className="block mb-1 font-semibold">Merchant/Payee</label>
                                        <Field
                                            type="text"
                                            name="merchant"
                                            placeholder="Enter merchant name"
                                            className={`w-full border-1 border-neutral-400 !p-2 rounded shadow-md ${c.selectable}`}
                                        />
                                        <ErrorMessage name="merchant" component="div" className="ml-1 my-2 text-red-500 text-sm" />
                                    </div>

                                    <div className=' w-full md:w-[48.5%]
                                    my-2'
                                    >
                                        <label className="block mb-1 font-semibold">Notes</label>
                                        <Field
                                            type="text"
                                            name="notes"
                                            placeholder="Add notes (optional)"
                                            className={`w-full border-1 border-neutral-400 !p-2 rounded shadow-md ${c.selectable}`}
                                        />
                                        <ErrorMessage name="notes" component="div" className="ml-1 my-2 text-red-500 text-sm" />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="text-white text-center mt-3 px-4 py-2 flex items-center justify-center gap-1
                                    bg-[#4338ca] hover:bg-[#4941a7] rounded cursor-pointer capitalize"
                                >
                                    <Plus size={16} color="#ffffff" strokeWidth={3} /> add transaction
                                </button>
                            </Form>
                        )}
                    </Formik>

                </div>

            </section>

        </>
    )
}

export default TransactionForm;