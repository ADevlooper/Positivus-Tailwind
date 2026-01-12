/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan files in the project. Adjust if your templates live elsewhere.
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './**/*.html',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      // Colors: a small palette you can use across the project
      colors: {
        greeny: '#b9ff66', // teal-500 like
        secondary: '#7c3aed', // violet-600
        accent: '#f97316', // orange-500
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        success: '#16a34a',
        info: '#0284c7',
        warning: '#f59e0b',
        danger: '#dc2626',
        // Project-specific color from earlier
        greeny: '#b9ff66',
      },

      // Spacing helpers
      spacing: {
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },

      // Border radius helpers
      borderRadius: {
        xl: '1rem',
      },

      // Shadows
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.08)',
      },

      // Typography defaults (works with @tailwindcss/typography)
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui'],
      },
    },
  },
  plugins: [
    // Popular official plugins. Install them if you want to use the features:
    // npm i -D @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio @tailwindcss/line-clamp
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
