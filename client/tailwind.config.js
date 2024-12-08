/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        default: '#192939', // Main background color
      },
      colors: {
        // Primary Colors
        primary1: '#FDDFAF', // Moon Yellow 
        primary2: '#2A2B4D', // Midnight Blue

        // Secondary Colors
        secondary1: '#F9F9F9', // Soft White 
        secondary2: '#A5C1DC', // Pale Blue 

        // Accent Colors
        accent1: '#F4D7C3',    // Peach 
        accent2: '#9FA3B2',    // Muted Gray 
        accent3: '#192939',    // Dark Navy 
      },
    },
  },
  plugins: [],
};


//colors 

// Primary Colors:
// Moon Yellow (#FDDFAF) - For the background or large sections.
// Midnight Blue (#2A2B4D) - For text, headers, or icons.

// Secondary Colors:
    
// Soft White (#F9F9F9) - For accents, borders, or to highlight key elements.
// Pale Blue (#A5C1DC) - For buttons, highlights, or secondary elements.

// Accent Colors:

// F4D7C3 (#F4D7C3) - For call-to-action buttons or important notifications.
// Muted Gray (#9FA3B2) - For subtle elements like dividers or hover states.