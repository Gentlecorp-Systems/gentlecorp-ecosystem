"use client";

import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { JSX } from "react";

/**
 * Komponente zum Abmelden des Benutzers.
 *
 * Diese Komponente stellt einen modernen, kreativen und seriösen Button dar,
 * über den sich der Benutzer abmelden kann. Beim Klick wird der Benutzer
 * automatisch abgemeldet und zur Startseite weitergeleitet.
 *
 * @returns {JSX.Element} Das Logout-Element.
 */
export default function Logout(): JSX.Element {
  /**
   * Handler zum Auslösen der Abmeldung.
   */
  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleSignOut}
      startIcon={<LogoutIcon />}
      sx={{
        textTransform: "none",
        fontWeight: "bold",
        borderRadius: "8px",
        paddingX: 2,
        paddingY: 1,
        boxShadow: 3,
        transition: "background-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          backgroundColor: "primary.dark",
          boxShadow: 6,
        },
      }}
    >
      Abmelden
    </Button>
  );
}
