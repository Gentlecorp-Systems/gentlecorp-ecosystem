// app/components/Layout.tsx
"use client";

import { Box, CssBaseline } from "@mui/material";
import Header from "../../../components/Header";
import SideNavbar from "../../../components/SideNavbar";
import { useState } from "react";
import Footer from "../../../components/Footer";

const headerHeight = 64;

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar-Status

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen); // Toggle Funktion

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <CssBaseline />

      {/* Header */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Platz für den Header */}
      {/* <Box sx={{ height: `${headerHeight}px` }} /> */}

      {/* Main Content mit Sidebar */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        <SideNavbar sidebarOpen={sidebarOpen} />

        {/* Hauptinhalt */}
        <Box sx={{ flexGrow: 1, px: 3, py: 2 }}>{children}</Box>
      </Box>

      {/* Footer */}
      <Box overflow={"hidden"}>
        <Footer />
        </Box>
    </Box>
  );
}
