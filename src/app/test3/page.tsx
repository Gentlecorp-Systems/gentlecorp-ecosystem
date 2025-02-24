"use client";

import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  Paper,
  TextField,
  Button,
  CircularProgress,
  CssBaseline,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Home as HomeIcon,
  People as PeopleIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Receipt as ReportsIcon,
  ListAlt as LogsIcon,
  ExitToApp as LogoutIcon,
  Login as LogInIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../../graphql/customer/query/customers";
import getApolloClient from "../../lib/apolloClient";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Zum Erkennen des aktiven Links

const drawerWidthOpen = 240;
const drawerWidthClosed = 70;

const headerHeight = 64; // Höhe des Headers
const footerHeight = 50; // Höhe des Footers

export default function CustomersPage() {
  const pathname = usePathname(); // Holt den aktuellen Seitenpfad
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  const client = session?.access_token
    ? getApolloClient(session.access_token)
    : getApolloClient(undefined);
  const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS, { client });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, link: "/" },
    { text: "Kunden", icon: <PeopleIcon />, link: "/test3" },
    { text: "Logs", icon: <LogsIcon />, link: "/logs" },
    { text: "Reports", icon: <ReportsIcon />, link: "/reports" },
    { text: "Control Panel", icon: <SettingsIcon />, link: "/settings" },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "username", headerName: "Benutzername", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "customerStatus", headerName: "Status", width: 200 },
  ];

  if (!session || !session.access_token || !session.user?.username) {
    return (
      <Typography
        color="error"
        variant="h6"
        sx={{ textAlign: "center", mt: 4 }}
      >
        Keine Session vorhanden.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#4E3792",
          width: "100%",
          height: `${headerHeight}px`,
        }}
      >
        <Toolbar>
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
          {/* Login/Logout Button abhängig vom Benutzerstatus */}
          {session?.user ? (
            <Button color="inherit" component={Link} href="/login">
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} href="/login">
              <LogInIcon sx={{ mr: 1 }} />
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Platz für den Header */}
      <Toolbar />

      {/* Sidebar (zwischen Header und Footer, mit Ein- & Ausklappen) */}
      <Drawer
        variant="permanent"
        open={sidebarOpen}
        sx={{
          position: "absolute",
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight + footerHeight}px)`,
          transition: "width 0.3s",
          "& .MuiDrawer-paper": {
            width: sidebarOpen ? drawerWidthOpen : drawerWidthClosed,
            backgroundColor: "#6A4BBC",
            color: "#ffffff",
            height: `calc(100vh - ${headerHeight + footerHeight}px)`,
            transition: "width 0.3s",
            overflowX: "hidden",
            mt: 8,
            borderRight: "0px ", // Standard kein Rand
          },
        }}
      >
        <List sx={{ mt: 2 }}>
          {menuItems.map(({ text, icon, link }) => (
            <ListItem
              button
              key={text}
              component={Link}
              href={link}
              sx={{
                borderTopLeftRadius: "100px ",
                borderBottomLeftRadius: "100px ",
                borderRight: pathname === link ? "4px solid #fff" : "none",
                mx: 1,
                my: 1,
                backgroundColor: pathname === link ? "#fff" : "transparent",
                color: pathname === link ? "#4E3792" : "#ddd",
                "&:hover": {
                  backgroundColor: "#fff",
                  color: "#4E3792",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: pathname === link ? "#4E3792" : "#ddd",
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

      {/* Hauptinhalt bleibt unverändert */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          px: 3,
          py: 2,
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F8F8FC",
            }}
          >
            <TextField
              label="Suche nach Benutzername"
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mr: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "#6A4BBC",
                "&:hover": { backgroundColor: "#4E3792" },
              }}
              startIcon={<AddIcon />}
            >
              Neuer Kunde
            </Button>
          </Paper>

          <Paper
            sx={{
              height: 500,
              width: "100%",
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#f0f0f0",
            }}
          >
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <CircularProgress sx={{ color: "#6A4BBC" }} />
              </Box>
            ) : (
              <DataGrid
                rows={data?.customers || []}
                columns={columns}
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[10, 25, 50]} // Optionen für Seitengröße
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#6A4BBC",
                    color: "#6A4BBC",
                  },
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "#F8F8FC",
                    // color: "#6A4BBC",
                    // backgroundColor: "#F8F8FC",
                  },
                  "& .MuiDataGrid-row:nth-of-type(even)": {
                    // backgroundColor: "#000",
                  },
                }}
              />
            )}
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#6A4BBC",
          color: "#ffffff",
          py: 2,
          textAlign: "center",
          width: "100%",
          height: `${footerHeight}px`,
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} GentleCorp - Alle Rechte vorbehalten.
        </Typography>
        <Typography variant="body2">
          <Link
            href="/impressum"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Impressum
          </Link>{" "}
          |{" "}
          <Link
            href="/datenschutz"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Datenschutz
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
