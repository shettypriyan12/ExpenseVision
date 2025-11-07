'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { House, Clock, DollarSign, ChartColumn, X } from "lucide-react";
import c from './sidebar.module.css';


import { useDispatch } from 'react-redux';

const AllSidebar = ({ mobileOpen, setMobileOpen }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        const userData =
            localStorage.getItem("user") || sessionStorage.getItem("user");

        const protectedRoutes = ["/dashboard", "/transactions", "/reports", "/budgets",];

        if (protectedRoutes.includes(pathname) && !userData) {
            router.replace("/login");
        }
    }, [pathname, router]);

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

    return (
        <>
            <section
                className={`
                    ${c.sidebar}
                    ${collapsed && isLargeScreen ? c.collapsed : ""}
                    ${!isLargeScreen ? c.mobileSidebar : ""}
                    ${!isLargeScreen && mobileOpen ? c.mobileOpen : ""}
                    ${!isLargeScreen && !mobileOpen ? c.mobileClosed : ""}
                `}
            >
                <div className={c.logo}>
                    <span>E</span>
                    {!collapsed && <h1>ExpenseVision</h1>}

                    {isLargeScreen && (
                        <button
                            className={c.toggleButton}
                            onClick={() => setCollapsed(!collapsed)}
                            aria-label="Toggle sidebar collapse"
                        >
                            {collapsed ? '>' : '<'}
                        </button>
                    )}
                </div>

                <nav className={c.menu}>
                    <Link
                        href="/dashboard"
                        className={`${pathname === "/dashboard" ? c.active : ""}`}
                        onClick={() => !isLargeScreen && setMobileOpen(false)}
                    >
                        <House size={20} strokeWidth={1.75} />
                        {(!collapsed || !isLargeScreen) && <span>Dashboard</span>}
                    </Link>

                    <Link
                        href="/reports"
                        className={`${pathname === "/reports" ? c.active : ""}`}
                        onClick={() => !isLargeScreen && setMobileOpen(false)}
                    >
                        <Clock size={20} strokeWidth={1.75} />
                        {(!collapsed || !isLargeScreen) && <span>Reports</span>}
                    </Link>

                    <Link
                        href="/transactions"
                        className={`${pathname === "/transactions" ? c.active : ""}`}
                        onClick={() => !isLargeScreen && setMobileOpen(false)}
                    >
                        <DollarSign size={20} strokeWidth={1.75} />
                        {(!collapsed || !isLargeScreen) && <span>Transactions</span>}
                    </Link>

                    <Link
                        href="/budgets"
                        className={`${pathname === "/budgets" ? c.active : ""}`}
                        onClick={() => !isLargeScreen && setMobileOpen(false)}
                    >
                        <ChartColumn size={20} strokeWidth={1.75} />
                        {(!collapsed || !isLargeScreen) && <span>Budgets</span>}
                    </Link>
                </nav>


            </section>

            {!isLargeScreen && mobileOpen && (
                <div
                    className={c.mobileOverlay}
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </>
    );
};

export default AllSidebar;



// {mobileOpen && (
//     <div className="fixed inset-0 z-50 lg:hidden">
//         {/* Background overlay */}
//         <div
//             className="absolute inset-0 bg-black/50"
//             onClick={() => setMobileOpen(false)}
//         ></div>

//         {/* Slide-out panel */}
//         <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform translate-x-0 transition-transform">
//             <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
//                 <span className="font-bold">Menu</span>
//                 <button onClick={() => setMobileOpen(false)}>
//                     <X size={24} />
//                 </button>
//             </div>

//             <nav className="flex flex-col gap-2 p-4">
//                 <Link
//                     href="/dashboard"
//                     className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${pathname === "/dashboard" ? "bg-gray-300 dark:bg-gray-800" : ""}`}
//                 >
//                     <House size={20} />
//                     <span>Dashboard</span>
//                 </Link>
//                 <Link href="/reports" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
//                     <Clock size={20} />
//                     <span>Reports</span>
//                 </Link>
//                 <Link href="/transactions" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
//                     <DollarSign size={20} />
//                     <span>Transactions</span>
//                 </Link>
//                 <Link href="/budgets" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
//                     <ChartColumn size={20} />
//                     <span>Budgets</span>
//                 </Link>
//             </nav>
//         </div>
//     </div>
// )}