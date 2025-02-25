/**
 * @file BrandingSignInPage.tsx
 * @description Diese Komponente stellt eine moderne, kreative und benutzerfreundliche
 * Anmeldeseite dar, die den Bildschirm in zwei Spalten aufteilt: links das klassische
 * Login mit E-Mail und Passwort, rechts die Anmeldung über externe Provider.
 * Das Design nutzt den verfügbaren Platz optimal aus und verbindet innovative UI-Elemente
 * mit seriösem Look.
 */

"use client";

import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { AuthResponse, type AuthProvider } from "@toolpad/core/SignInPage";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Box,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

/**
 * Liste der unterstützten Authentifizierungsanbieter.
 */
const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "credentials", name: "Email and Password" },
];

/**
 * Branding-Konfiguration mit Logo, Titel und Tagline.
 */
const BRANDING = {
  logo: (
    <Image
      src="https://mui.com/static/logo.svg"
      alt="MUI logo"
      width={50}
      height={30}
    />
  ),
  title: "Creative MUI",
  tagline: "Innovativ. Modern. Inspirierend.",
};

/**
 * Simulierte Anmeldefunktion, die Authentifizierungsanfragen verarbeitet.
 *
 * @param provider - Der ausgewählte Authentifizierungsanbieter.
 * @param formData - Optional: Formular-Daten, die die Anmeldedaten enthalten.
 * @returns Ein Promise, das ein AuthResponse-Objekt liefert.
 */
const signIn: (
  provider: AuthProvider,
  formData?: FormData
) => Promise<AuthResponse> | void = async (provider, formData) => {
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      const email = formData?.get("email");
      const password = formData?.get("password");
      alert(
        `Signing in with "${provider.name}" and credentials: ${email}, ${password}`
      );
      resolve({
        type: "CredentialsSignin",
        error: "Invalid credentials.",
        success: "Check your email for a verification link.",
      });
    }, 500);
  });
};

/**
 * Hauptkomponente der geteilten Anmeldeseite.
 *
 * @returns JSX.Element der Anmeldeseite.
 */
export default function BrandingSignInPage(): JSX.Element {
  const theme = useTheme();

  /**
   * Handler für den klassischen Anmelde-Submit (E-Mail/Passwort).
   *
   * @param event - Das Submit-Ereignis des Formulars.
   */
  const handleCredentialsSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // Aufruf der Anmeldefunktion mit dem "credentials"-Provider
    signIn({ id: "credentials", name: "Email and Password" }, formData);
  };

  return (
    <AppProvider branding={BRANDING} theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: "1200px",
            gap: 4,
          }}
        >
          {/* Linke Spalte: E-Mail/Passwort Login */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              backgroundColor: "#ffffffee",
              backdropFilter: "blur(5px)",
              animation: "fadeIn 1s ease-in-out",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Box sx={{ mb: 2, textAlign: "center" }}>
              {BRANDING.logo}
              <Typography variant="h4" sx={{ mt: 1 }}>
                {BRANDING.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#555" }}>
                {BRANDING.tagline}
              </Typography>
            </Box>
            <form onSubmit={handleCredentialsSubmit}>
              <CustomEmailField />
              <CustomPasswordField />
              <AgreeWithTerms />
              <CustomButton />
            </form>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <SignUpLink />
              <ForgotPasswordLink />
            </Box>
          </Paper>
          {/* Rechte Spalte: Login via Provider */}
          <Paper
            elevation={8}
            sx={{
              flex: 1,
              p: 4,
              borderRadius: 3,
              backgroundColor: "#ffffffee",
              backdropFilter: "blur(5px)",
              animation: "fadeIn 1s ease-in-out",
              "@keyframes fadeIn": {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Typography variant="h5">Anmelden mit</Typography>
            </Box>
            {providers
              .filter((provider) => provider.id !== "credentials")
              .map((provider) => (
                <Button
                  key={provider.id}
                  variant="outlined"
                  color="info"
                  size="medium"
                  fullWidth
                  sx={{
                    my: 1,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                  onClick={() => signIn(provider)}
                >
                  {provider.name}
                </Button>
              ))}
          </Paper>
        </Box>
      </Box>
    </AppProvider>
  );
}

/**
 * Benutzerdefiniertes E-Mail-Feld mit integriertem Icon.
 *
 * @returns JSX.Element eines Textfeldes für die E-Mail-Eingabe.
 */
function CustomEmailField(): JSX.Element {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="inherit" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      sx={{
        my: 1,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    />
  );
}

/**
 * Benutzerdefiniertes Passwort-Feld mit Sichtbarkeitsumschaltung.
 *
 * @returns JSX.Element eines Eingabefeldes für das Passwort.
 */
function CustomPasswordField(): JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);

  /**
   * Wechselt den Sichtbarkeitsstatus des Passworts.
   */
  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  /**
   * Verhindert das Standardverhalten bei Maus-Klicks.
   *
   * @param event - Das Mausereignis.
   */
  const handleMouseDownPassword = (event: React.MouseEvent): void => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 1 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
              sx={{
                transition: "transform 0.3s",
                "&:hover": { transform: "rotate(20deg)" },
              }}
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

/**
 * Benutzerdefinierter Button zum Absenden des Anmeldeformulars.
 *
 * @returns JSX.Element eines Buttons.
 */
function CustomButton(): JSX.Element {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      size="medium"
      disableElevation
      fullWidth
      sx={{
        my: 2,
        transition: "background-color 0.3s, transform 0.3s",
        "&:hover": {
          backgroundColor: "primary.dark",
          transform: "scale(1.03)",
        },
      }}
    >
      Log In
    </Button>
  );
}

/**
 * Komponente zur Zustimmung der AGB.
 *
 * @returns JSX.Element mit einem Checkbox-Element.
 */
function AgreeWithTerms(): JSX.Element {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name="tandc"
          value="true"
          color="primary"
          sx={{
            padding: 0.5,
            "& .MuiSvgIcon-root": {
              fontSize: 20,
              transition: "color 0.3s",
            },
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
            },
          }}
        />
      }
      label="I agree with the T&C"
      componentsProps={{ typography: { variant: "body2" } }}
    />
  );
}

/**
 * Link-Komponente zur Registrierung.
 *
 * @returns JSX.Element eines Links zur Registrierungsseite.
 */
function SignUpLink(): JSX.Element {
  return (
    <Link
      href="/"
      style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}
    >
      Sign up
    </Link>
  );
}

/**
 * Link-Komponente für die Passwort-Wiederherstellung.
 *
 * @returns JSX.Element eines Links zur Seite "Passwort vergessen?".
 */
function ForgotPasswordLink(): JSX.Element {
  return (
    <Link
      href="/"
      style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}
    >
      Forgot password?
    </Link>
  );
}
