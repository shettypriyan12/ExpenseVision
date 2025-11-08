'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import AOS from 'aos';
import "aos/dist/aos.css";
import { Eye, EyeOff, LogIn } from 'lucide-react';
import c from './SignUpForm.module.css';
import Filler1 from '@/components/formPage/filler1';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/auth/auth-action';


import { useRouter } from 'next/navigation';

export default function SignUp() {

    const [darkMode, setDarkMode] = useState(false);
    // const [showGeneralError, setShowGeneralError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { signUpStatus, signUpErr } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    console.log(signUpStatus, signUpErr);   

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
    }, [darkMode])


    const validationSchema = Yup.object({
        name: Yup.string().required("This field is required."),
        email: Yup.string().email("Invalid email").required("This field is required."),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/, "Password must include uppercase, lowercase, number, and special character.")
            .required("This field is required."),
        confirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required("Confirm your password"),
        terms: Yup.boolean().oneOf([true], "You must accept the terms and conditions."),
    });


    return (
        <>
            <section className={`${c.signUpPage}`}>

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
                        <h1>Create an account</h1>
                        <p>Join WealthPilot to take control of your financial future</p>
                        <Formik
                            initialValues={{ name: '', email: '', password: '', confirm: '', terms: false }}

                            validationSchema={validationSchema}

                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                dispatch(signUp(values))
                                .then(resAction => {
                                        if (resAction.meta.requestStatus === 'fulfilled') {
                                            // setMessageSent(true);
                                            resetForm();
                                            setTimeout(() => router.push("/login"), 1000);
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
                                            setTouched({ name: true, email: true, password: true, confirm: true, terms: true }, false);
                                            // setShowGeneralError(true);
                                            return;
                                        }

                                        handleSubmit(e);
                                    }}
                                >
                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <label >Full Name</label>
                                            <Field type="text" name="name" placeholder="abc123@email.com" className={c.inp} autoComplete="name" />
                                        </div>
                                        <ErrorMessage name="name" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <label >Email</label>
                                            <Field type="text" name="email" placeholder="abc123@email.com" className={c.inp} autoComplete="email" />
                                        </div>
                                        <ErrorMessage name="email" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <label >Password</label>
                                            <Field type={showPassword ? "text" : "password"}
                                                name="password" placeholder="•••••••••" className={c.inp} autoComplete="password" />
                                            <span className={c.togglePassword}
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                {showPassword ? <Eye strokeWidth={1.25} size={18} /> : <EyeOff strokeWidth={1.25} size={18} />}
                                            </span>
                                        </div>
                                        <ErrorMessage name="password" component="div" className={c.error} />
                                    </div>

                                    <div className={c.field}>
                                        <div className={`${c.input} `}>
                                            <label >Confirm Password</label>
                                            <Field type={showConfirm ? "text" : "password"}
                                                name="confirm" placeholder="•••••••••" className={c.inp} />
                                            <span className={c.togglePassword}
                                                onClick={() => setShowConfirm(prev => !prev)}
                                            >
                                                {showConfirm ? <Eye strokeWidth={1.25} size={18} /> : <EyeOff strokeWidth={1.25} size={18} />}
                                            </span>
                                        </div>
                                        <ErrorMessage name="confirm" component="div" className={c.error} />
                                    </div>

                                    <div className={`${c.check}`}>
                                        <div className=' flex items-center gap-2.5 py-2'>
                                            <Field type="checkbox" name="terms" />
                                            <p>I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
                                        </div>
                                        <ErrorMessage name="terms" component="div" className={`${c.error} px-4`} />
                                    </div>

                                    {/* {messageSent && (
                                            <div className={c.sent}>
                                                Logged in successfully
                                            </div>
                                        )} */}

                                    {signUpStatus === 'failed' && signUpErr && (
                                        <div className={c.generalError}>{signUpErr}</div>
                                    )}

                                    <button type="submit" className={c.submit} disabled={isSubmitting || signUpStatus === 'pending'} >
                                        <LogIn strokeWidth={1.75} size={16} />
                                        {isSubmitting ? 'Signing up...' : 'Sign up'}
                                    </button>

                                    {/* {showGeneralError && (
                                        <div className={c.generalError}>
                                            One or more fields are empty . Fill out the details .
                                        </div>
                                    )} */}

                                    <div className={c.directSignIn}>
                                        <Link href={`/login`}>Already have an account? <span>Sign in</span></Link>
                                    </div>

                                </Form>
                            )}
                        </Formik>
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
    )
}
