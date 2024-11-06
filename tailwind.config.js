/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {},
            zIndex: {
                1: '1'
            }
        },
        fontFamily: {
            sans: ['"Inter", Arial, sans-serif']
        },
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1400px'
        },
        fontSize: {
            xs: '14px',
            sm: '15px',
            base: '16px',
            md: '18px',
            lg: '20px',
            xl: '30px'
        }
    }
};
