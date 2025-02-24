// app/components/Header.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogInIcon from "@mui/icons-material/Login";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TimerIcon from "@mui/icons-material/Timer";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import Logout from "./Logout";
import { formatTime } from "../utils/counter-format.util";

const HEADER_HEIGHT = 64;

/**
 * Generiert aus einem vollständigen Namen die Initialen für den Avatar.
 *
 * @param {string} name - Der vollständige Name des Benutzers.
 * @returns {string} Die generierten Initialen.
 */
const generateAvatarInitials = (name: string = ""): string => {
  const names = name.trim().split(" ");
  if (names.length === 0) return "";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
};

/**
 * Schnittstellendefinition für die Eigenschaften der Header-Komponente.
 */
interface HeaderProps {
  /**
   * Funktion, die den Zustand der Sidebar umschaltet.
   */
  toggleSidebar: () => void;
}

/**
 * Header-Komponente für das GentleCorp-Ecosystem.
 *
 * Diese Komponente stellt den oberen Navigationsbereich dar. Sie enthält:
 * - Einen Button zum Umschalten der Sidebar.
 * - Navigationslinks zu "Startseite", "GentleBank" und "GentleStore".
 * - Benachrichtigungs-Icons für Mails und sonstige Mitteilungen.
 * - Einen Benutzerbereich, der abhängig vom Anmeldestatus einen Login-/Registrierungs-Button
 *   oder einen Avatar mit einem modernen, kreativen Dropdown-Menü anzeigt.
 *
 * @param {HeaderProps} props - Die Eigenschaften der Komponente.
 * @returns {JSX.Element} Das gerenderte Header-Element.
 */
const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { data: session, update } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [remainingTime, setRemainingTime] = useState<number | undefined>(
      undefined
    );

  /**
   * Öffnet das Dropdown-Menü des Benutzerbereichs.
   *
   * @param {React.MouseEvent<HTMLElement>} event - Das Klickereignis.
   */
  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Schließt das Dropdown-Menü des Benutzerbereichs.
   */
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  // Manuelle Token-Aktualisierung
  const handleRefreshToken = useCallback(async () => {
    try {
      await update();
      handleClose();
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Tokens:", err);
    }
  }, [update]);

   useEffect(() => {
     if (session?.expires_in) {
       const now = Math.floor(Date.now() / 1000);
       setRemainingTime(session?.expires_in - now);

       const interval = setInterval(() => {
         setRemainingTime((prev) =>
           prev !== undefined ? prev - 1 : undefined
         );
       }, 1000);
       return () => clearInterval(interval);
     }
   }, [session]);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#4E3792",
        width: "100%",
        height: HEADER_HEIGHT,
      }}
    >
      <Toolbar>
        {/* Button zum Umschalten der Sidebar */}
        <IconButton color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin-Bereich
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Startseite
        </Button>
        <Button color="inherit" component={Link} href="/bank">
          GentleBank
        </Button>
        <Button color="inherit" component={Link} href="/store">
          GentleStore
        </Button>

        {/* Benachrichtigungs-Icons */}
        <IconButton size="large" aria-label="4 neue Mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="17 neue Benachrichtigungen"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Benutzerbereich: Login/Registrierung oder Avatar mit kreativem Dropdown-Menü */}
        {!session ? (
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Button
              color="inherit"
              component={Link}
              href="/login"
              startIcon={<LogInIcon />}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              href="/register"
              sx={{ ml: 1 }}
            >
              Registrieren
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <IconButton onClick={handleMenu} color="inherit">
              {session.user?.image ? (
                <Avatar
                  alt={session.user?.name || "Benutzer"}
                  src={session.user.image}
                  sx={{ width: 48, height: 48 }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "#fff",
                    color: "#4E3792",
                    fontSize: "1.5rem",
                  }}
                >
                  {generateAvatarInitials(session.user?.name || "Benutzer")}
                </Avatar>
              )}
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                elevation: 12,
                sx: {
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 220,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <MenuItem>
                Hallo {session.role} {session.user.username}
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} href="/profile">
                <AccountCircle sx={{ mr: 1 }} />
                Profil
              </MenuItem>
              <MenuItem>
                <TimerIcon sx={{ mr: 1 }} />
                {remainingTime !== undefined ? (
                  <Typography variant="body2">
                    Token läuft ab in: {formatTime(remainingTime)}
                  </Typography>
                ) : (
                  <Typography variant="subtitle1" align="center">
                    Dein Token läuft ist abgelaufen.
                  </Typography>
                )}
              </MenuItem>
              <MenuItem onClick={() => handleRefreshToken()}>
                <RefreshIcon sx={{ mr: 1 }} />
                Token erneuern
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} href="/settings">
                <SettingsIcon sx={{ mr: 1 }} />
                Einstellungen
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Logout />
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
