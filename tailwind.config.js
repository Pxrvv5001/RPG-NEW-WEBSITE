/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // ▼▼▼ THIS LINE IS REQUIRED FOR THE TOGGLE TO WORK ▼▼▼
    darkMode: 'class',
    // ▲▲▲ MAKE SURE THIS IS HERE ▲▲▲
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}