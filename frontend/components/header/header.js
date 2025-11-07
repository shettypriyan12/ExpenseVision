"use client";

import { useState, useEffect } from "react";
import { Bell, Menu, LogOut } from "lucide-react";
import { logout } from '@/app/store/auth/auth-slice';

import c from './header.module.css';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Header({ onMenuClick }) {
    const [darkMode, setDarkMode] = useState(false);
    const [showBox, setShowBox] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();


    const handleLogout = () => {
        setTimeout(() => {
            dispatch(logout())
        }, 1000)

        router.push("/login")
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUserName(parsed?.name || "");
        }
    }, []);

    useEffect(() => {
        function handleResize() {
            setIsLargeScreen(window.innerWidth >= 1024);
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

    return (
        <>
            <section className={c.headSection}>
                {!isLargeScreen && (
                    <button className="block lg:hidden"
                        onClick={onMenuClick}
                    >
                        <Menu size={24} />
                    </button>
                )}

                <div className={c.headContent}>
                    <button className={c.notificationBtn}>
                        <Bell size={20} />
                        {/* <span className={} /> */}
                    </button>

                    {/* Theme Toggle */}
                    <label className={c.switch}>
                        <span className={c.sun}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                        <span className={c.moon}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>
                        <input id="theme-toggle" type="checkbox" onClick={() => setDarkMode(!darkMode)} className={c.input} />
                        <span className={c.slider}></span>
                    </label>

                    <div className={c.userInitials}>
                        <h1 onClick={() => setShowBox(prev => !prev)} >{getInitials(userName)}</h1>

                        {showBox && (
                            <div className={`${c.menu}`}>
                                <button
                                    className={` ${c.active}`}
                                    onClick={handleLogout}
                                >
                                    <LogOut size={20} strokeWidth={1.75} />Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
