"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import AllSidebar from "@/components/sidebar/sidebar";
import { useRouter } from "next/navigation";
import { isTokenExpired } from "../utils/isTokenExpired";


export default function SidebarLayout({ children }) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            const token = sessionStorage.getItem("token");

            if (token && isTokenExpired(token)) {
                sessionStorage.clear();
                router.push("/login");
            }
        }, 1 * 60 * 1000);

        return () => clearInterval(interval);
    }, [router]);

return (
    <>
        <div className="min-h-screen w-full overflow-hidden" style={{ background: "var(--background)" }}>
            <Header onMenuClick={() => setMobileOpen(true)} />
            <div className="w-full flex overflow-hidden">
                <AllSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
                <main className="w-full ">
                    {children}
                </main>
            </div>
        </div>
    </>
)
}