module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      "primary": "#323232",
      "secondary": "#4FB9BB",
      "terciary": "#E8EAF0"
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
