'use client'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
// import {
//   experimental_extendTheme as materialExtendTheme,
//   Experimental_CssVarsProvider as MaterialCssVarsProvider,
//   THEME_ID as MATERIAL_THEME_ID,
// } from '@mui/material/styles';
// import { CssVarsProvider as JoyCssVarsProvider } from '@mui/joy/styles';
// import CssBaseline from '@mui/material/CssBaseline';


const muiTheme = createTheme({
    palette: {
      mode: 'light',
    },
    typography: {
      fontFamily: "var(--font-body)",
      subtitle1: {
        fontFamily: "var(--font-body)",
      }
    },
    overrides: {
      MuiInputLabel: {
        root: {
          // fontSize: '1rem',
        },
        shrink: {
          transform: 'translate(14px, -1px) scale(1) !important',
        },
        outlined: {
          transform: 'translate(14px, 16px) scale(1)',
        },
      }
    },
    components: {
      MuiOutlinedInput: {
        root: {
          // fontSize: '1rem'
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: '0.9rem',
            // fontSize: '30px',
          },
        },
      },
    }
  })

const ThemeProviderMui = ({ children }) => {
    return (
        <>
        <ThemeProvider theme={muiTheme}>
            {children}
        </ThemeProvider>
        {/* <MaterialCssVarsProvider theme={muiTheme}>
          <JoyCssVarsProvider>
            <CssBaseline enableColorScheme/>
            {children}
          </JoyCssVarsProvider>
        </MaterialCssVarsProvider> */}

        </>
    )
}

export default ThemeProviderMui;