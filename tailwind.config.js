/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './components/*.{js,jsx,ts,tsx}',
        './layout/**/*.{js,jsx,ts,tsx}',
        './screens/**/*.{js,jsx,ts,tsx}',
        './screens/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
