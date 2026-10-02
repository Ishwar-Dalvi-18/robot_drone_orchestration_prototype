/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',     // Cyan/Blue for tech
        primary_dark: '#0284c7', 
        secondary: '#64748b',   
        success: '#10b981',     // Emerald
        info: '#38bdf8',
        warning: '#f59e0b',     // Amber
        danger: '#ef4444',      // Red
        dark: '#f8fafc',        // Inverted: Light text for dark background
        muted: '#94a3b8',       // Muted text
        default: '#cbd5e1',     // Default text
        body: '#09090b',        // Very dark background
        surface: '#18181b',     // Slightly lighter panels
        border: '#27272a',      // Subtle borders
      },
      fontFamily: {
        sans: ['"Inter"', '"Outfit"', 'sans-serif'], 
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
        'divi': '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 15px rgba(14, 165, 233, 0.5)',
        'glow-success': '0 0 15px rgba(16, 185, 129, 0.5)',
        'glow-warning': '0 0 15px rgba(245, 158, 11, 0.5)',
        'glow-danger': '0 0 15px rgba(239, 68, 68, 0.5)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
}
