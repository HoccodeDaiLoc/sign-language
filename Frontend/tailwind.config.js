/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // backgroundSecondaryColor: {
      //   'custom-var': 'var(--background-color)',
      // },
      maxHeightLogOutContainer: {
        'custom': 'calc(100% - 58px - 3rem)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0, 1.2, 1, 1)',
      },
    },
  },
  plugins: [],
}