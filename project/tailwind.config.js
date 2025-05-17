/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#EEF2FD',
          100: '#D7E0FA',
          200: '#B0C4F4',
          300: '#86A6ED',
          400: '#5D89E7',
          500: '#3563E9', // Primary
          600: '#2952D8',
          700: '#1E41C8',
          800: '#1531A7',
          900: '#0B2176',
        },
        accent: {
          50: '#FFFBEA',
          100: '#FFF7D4',
          200: '#FFEFAA',
          300: '#FFE77F',
          400: '#FFDE55',
          500: '#FFD53F', // Accent
          600: '#EBBD31',
          700: '#D6A623',
          800: '#B38A15',
          900: '#906E07',
        },
        success: {
          50: '#ECFCF2',
          100: '#D4F8E1',
          200: '#A9F0C3',
          300: '#7DE9A5',
          400: '#52E187',
          500: '#34C759', // Success
          600: '#28B34C',
          700: '#1D9F3E',
          800: '#127A2F',
          900: '#075620',
        },
        warning: {
          50: '#FEF5EC',
          100: '#FEEDDA',
          200: '#FCDEB6',
          300: '#FAC892',
          400: '#F8B46D',
          500: '#FF9500', // Warning
          600: '#E87D00',
          700: '#D16500',
          800: '#BA4D00',
          900: '#A33500',
        },
        error: {
          50: '#FDEEEE',
          100: '#FBDEDE',
          200: '#F7BDBD',
          300: '#F39C9C',
          400: '#EF7B7B',
          500: '#FF3B30', // Error
          600: '#E82C21',
          700: '#D11D13',
          800: '#BA0F04',
          900: '#A30000',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      boxShadow: {
        card: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 8px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};