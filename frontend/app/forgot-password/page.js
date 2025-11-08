'use client';

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import AOS from 'aos';
import "aos/dist/aos.css";
import { Mail } from 'lucide-react';
import c from './ForgotPass.module.css';
import Filler1 from '@/components/formPage/filler1';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

// import "../globals.css";
import { forgotPass } from '../store/auth/auth-action';
import CircleLoader from '@/components/loaders/circleloader';

export default function ForgotPassword() {

    const [darkMode, setDarkMode] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const { forgotStatus, forgotErr } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
        });
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required')
    });

    return (
        <>
            <section className={c.forgotPass}>

                <label className={c.switch}>
                    <span className={c.sun}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                    <span className={c.moon}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
                    <input id="theme-toggle" type="checkbox" onClick={() => setDarkMode(!darkMode)} className={c.input} />
                    <span className={c.slider}></span>
                </label>

                <div className={`${c.left}`}>
                    <Link href={`/login`} className={c.logo}>
                        <span>E</span>
                        <h1>ExpenseVision</h1>
                    </Link>

                    <div className={`${c.formcontent}`} data-aos="fade-up" data-aos-offset="200" data-aos-delay="0" data-aos-duration="200">
                        <h1>Forgot your password?</h1>
                        <p>Enter your email and we&apos;ll send you a link to reset your password</p>

                        {messageSent ? (
                            <>
                                <div className={c.sent}>
                                    <div className='flex gap-2 items-center content-start'>
                                    <Mail strokeWidth={1.75} size={16} />
                                        <h3 className='font-[600]'>Check your email</h3>
                                    </div>
                                    <div>    
                                        <p>We&apos;ve sent a password reset link to your email address.</p>
                                        <p>Please check your inbox and follow the instructions.</p>
                                    </div>
                                </div>

                                <div className={c.directLogin}>
                                    <Link href={`/login`}>Remember your password? <span>Sign in</span></Link>
                                </div>
                            </>
                        ) : (
                            <Formik
                                initialValues={{ email: '' }}

                                validationSchema={validationSchema}

                                onSubmit={(values, { setSubmitting, resetForm }) => {
                                    dispatch(forgotPass(values))
                                        .then(resAction => {
                                            if (resAction.meta.requestStatus === 'fulfilled') {
                                                setMessageSent(true);
                                                resetForm();
                                                // setTimeout(() => router.push("/dashboard"), 3000);
                                            }
                                        })
                                        .finally(() => {
                                            setSubmitting(false);
                                        });
                                }}
                            >
                                {({ isSubmitting, validateForm, setTouched, values, handleSubmit, }) => (
                                    <Form className={c.form}
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            // setShowGeneralError(false);

                                            const errors = await validateForm();
                                            if (Object.keys(errors).length > 0) {
                                                setTouched({ email: true }, false);
                                                // setShowGeneralError(true);
                                                return;
                                            }

                                            handleSubmit(e);
                                        }}
                                    >
                                        <div className={c.field}>
                                            <div className={`${c.input} `}>
                                                <label >Email</label>
                                                <Field type="text" name="email" placeholder="abc123@email.com" className={c.inp} autoComplete="email" />
                                            </div>
                                            <ErrorMessage name="email" component="div" className={c.error} />
                                        </div>

                                        {forgotStatus === 'failed' && forgotErr && (
                                            <div className={c.generalError}>{forgotErr}</div>
                                        )}

                                        <button type="submit" className={c.submit} disabled={isSubmitting || forgotStatus === 'pending'} >
                                            {isSubmitting ?
                                                (<>
                                                    <CircleLoader /> Sending reset link
                                                </>) : (<>
                                                    <Mail strokeWidth={1.75} size={16} /> Send reset link
                                                </>)}
                                        </button>

                                        {/* {showGeneralError && (
                                        <div className={c.generalError}>
                                            One or more fields are empty . Fill out the details .
                                        </div>
                                    )} */}

                                        <div className={c.directLogin}>
                                            <Link href={`/login`}>Remember your password? <span>Sign in</span></Link>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        )
                        }


                    </div>

                    <div className={`mt-auto flex text-center justify-center text-[14px] ${c.copyright}`}
                    >
                        © 2025 WealthPilot Financial Advisor. All rights reserved.</div>
                </div>

                <div className={`${c.right}`}>
                    <Filler1 />
                </div>
            </section>
        </>
    );
}; 
