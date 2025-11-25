/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          'hover': '#2563EB',
        },
        secondary: '#6B7280',
        'text-dark': '#111827',
        'text-light': '#4B5563',
        'background-light': '#FFFFFF',
        'background-grey': '#F9FAFB',
        'border-color': '#E5E7EB',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1593593552593-9d1a3843d15b?q=80&w=2070&auto=format&fit=crop')",
      }
    },
  },
  plugins: [],
}
