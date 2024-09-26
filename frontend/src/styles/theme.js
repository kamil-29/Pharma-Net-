import { createTheme } from '@mui/material/styles';
import { teal, deepOrange } from '@mui/material/colors';
const primaryColor = "#0d73bb";
// Define your custom color palettes
const lightPalette = {
  primary: {
    main: primaryColor,
  },
  secondary: {
    main: teal[500],
  },
  error: {
    main: deepOrange[500],
  },
};

const darkPalette = {
  primary: {
    main: primaryColor,
  },
  secondary: {
    main: teal[300],
  },
  error: {
    main: deepOrange[300],
  },
};

// Create the theme with custom palettes
 export const lighttheme = createTheme({
  palette: {
    mode: 'light', // Default mode is light
    primary: lightPalette.primary,
    secondary: lightPalette.secondary,
    error: lightPalette.error,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Merge the dark palette into the theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: darkPalette.primary,
    secondary: darkPalette.secondary,
    error: darkPalette.error,
  },
});
 