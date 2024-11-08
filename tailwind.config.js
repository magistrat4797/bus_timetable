/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                black: '#1A1A1A',
                primary: {
                    DEFAULT: '#1952E1',
                    dark: '#1649CA'
                },
                secondary: '#2E3E6E',
                'white-gray': '#F8F8FB',
                gray: {
                    DEFAULT: '#9A9DA4',
                    lightest: '#F3F4F9',
                    light: '#E2E4EA',
                    dark: '#63666E',
                    darkest: '#33373C'
                }
            },
            zIndex: {
                1: '1'
            },
            height: {
                nav: '60px',
                'nav-desktop': '64px',
                placeholder: '300px',
                'placeholder-tablet': '330px',
                'placeholder-desktop': '444px'
            }
        },
        fontFamily: {
            sans: ['"Inter", Arial, Helvetica, sans-serif']
        },
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1440px'
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            md: '18px',
            lg: '24px'
        }
    }
};
