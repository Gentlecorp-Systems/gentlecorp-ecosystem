// app/components/SideNavbar.tsx
"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  ListAlt as LogsIcon,
  Receipt as ReportsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;
const headerHeight = 64;
const footerHeight = 50;

const menuItems = [
  { text: "Dashboard", icon: <HomeIcon />, link: "/" },
  { text: "Kunden", icon: <PeopleIcon />, link: "/analytics/customers" },
  { text: "Logs", icon: <LogsIcon />, link: "/logs" },
  { text: "Reports", icon: <ReportsIcon />, link: "/reports" },
  { text: "Control Panel", icon: <SettingsIcon />, link: "/settings" },
];

/**
 * Prüft, ob der aktuelle Pfad zum übergebenen Link gehört.
 * Wird speziell für "/analytics/customers" erweitert, sodass alle Unterrouten als aktiv gelten.
 *
 * @param {string} link - Der zu prüfende Link.
 * @param {string} pathname - Der aktuelle Pfad.
 * @returns {boolean} true, wenn der Link als aktiv betrachtet wird.
 */
function isActive(link: string, pathname: string): boolean {
  if (link === "/analytics/customers") {
    return pathname.startsWith(link);
  }
  return pathname === link;
}

export default function SideNavbar({ sidebarOpen }: { sidebarOpen: boolean }) {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
          backgroundColor: "#6A4BBC",
          color: "#ffffff",
          hposition: "absolute",
          top: `${headerHeight}px`, // Startet unter dem Header
          bottom: `${footerHeight}px`, // Endet über dem Footer
          height: `calc(100vh - ${headerHeight}px)`, // Berechnet die verfügbare Höhe
          overflowY: "auto", // Scrollbar aktivieren, falls nötig
          //mt: 8,
          borderRight: "0px ", // Standard kein Rand
        },
      }}
    >
      <List sx={{ mt: 2 }}>
        {menuItems.map(({ text, icon, link }) => (
          <ListItem
            key={text}
            component={Link}
            href={link}
            sx={{
              borderTopLeftRadius: "100px ",
              borderBottomLeftRadius: "100px ",
              borderRight: isActive(link, pathname) ? "4px solid #fff" : "none",
              mx: 1,
              my: 1,
              backgroundColor: isActive(link, pathname)  ? "#fff" : "transparent",
              color: isActive(link, pathname)  ? "#4E3792" : "#ddd",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#4E3792",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive(link, pathname)  ? "#4E3792" : "#ddd",
                minWidth: sidebarOpen ? "40px" : "50px",
                "&:hover": {
                  color: "#4E3792",
                },
              }}
            >
              {icon}
            </ListItemIcon>
            {sidebarOpen && <ListItemText primary={text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
