/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    daisyui:{
        themes: [
            "light",
            "dracula",
        ]
    },
    plugins: [require('daisyui')],
}

