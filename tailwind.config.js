module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      borderRadius: {
        md: '4px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}
