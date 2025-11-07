/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                frontback: "var(--frontback)",
                frontback1: "var(--frontback1)",
                theme1: "var(--theme1)",
                theme2: "var(--theme2)",
                theme3: "var(--theme3)",
                theme4: "var(--theme4)",
                icon1: "var(--icon1)",
                green: "#34D399",
                red: "#FF0000",
                base: "#4e46e5b3",
                whiteLow: "#ffffff33",
                text2: "#E0E7FF",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
