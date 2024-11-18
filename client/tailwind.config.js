/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary1: '#F4D7C3',    // Peach
        primary2: '#2A2B4D',    // Midnight Blue
        
        // Secondary Colors
        secondary1: '#F9F9F9',  // Soft White
        secondary2: '#A5C1DC',  // Pale Blue
        
        // Accent Colors
        accent1: '#FDDFAF',     // Moon Yellow
        accent2: '#9FA3B2',     // Muted Gray
      }
    },
  },
  plugins: [],
}

//colors 

// Primary Colors:
// Peach (#F4D7C3) - For the background or large sections.
// Midnight Blue (#2A2B4D) - For text, headers, or icons.

// Secondary Colors:
    
// Soft White (#F9F9F9) - For accents, borders, or to highlight key elements.
// Pale Blue (#A5C1DC) - For buttons, highlights, or secondary elements.

// Accent Colors:

// Moon Yellow (#FDDFAF) - For call-to-action buttons or important notifications.
// Muted Gray (#9FA3B2) - For subtle elements like dividers or hover states.