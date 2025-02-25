/**
 * @file theme.ts
 * @description Konfiguriert das Material-UI-Theme gemäß den Projektanforderungen.
 * Das Farbschema beinhaltet:
 * - Primärfarbe: #6A4BBC (für Sidebar, Buttons und AppBar)
 * - Sekundärfarbe: #F8F8FC (für den Hintergrund)
 * - Akzentfarben: #4E3792 (für Hover-Effekte und UI-Highlights) und #312E81 (für Icons und sekundäre Buttons)
 * - Statusfarben: #A3E635 (aktiv) und #F87171 (inaktiv)
 */

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#6A4BBC",
        },
        secondary: {
            main: "#F8F8FC",
        },
        info: {
            main: "#312E81",
        },
        success: {
            main: "#A3E635",
        },
        error: {
            main: "#F87171",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
});

export default theme;
