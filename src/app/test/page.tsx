"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  IconButton,
  CircularProgress,
  Box,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "../../graphql/customer/query/customers";
import getApolloClient from "../../lib/apolloClient";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const { data: session } = useSession();

  const client = session?.access_token
    ? getApolloClient(session.access_token)
    : getApolloClient(undefined);
  const { loading, error, data, refetch } = useQuery(GET_CUSTOMERS, {
    client,
  });

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "lastName", headerName: "Nachname", width: 200 },
    { field: "tierLevel", headerName: "Stufe", width: 150 },
    { field: "username", headerName: "Benutzername", width: 200 },
    { field: "contactOptions", headerName: "Kontaktoptionen", width: 250 },
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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            backgroundColor: "#6A4BBC",
            color: "#ffffff",
          },
        }}
      >
        <Toolbar />
        <List>
          <Link href="/login">
            <ListItem button component="div">
              <ListItemIcon sx={{ color: "#fff" }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <ListItem button>
            <ListItemIcon sx={{ color: "#fff" }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Kunden" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#4E3792" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Kundenübersicht
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content Section */}
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* Search & Action Bar */}
          <Paper
            sx={{
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 2,
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
            <IconButton
              color="primary"
              onClick={() => refetch()}
              sx={{ color: "#00FFFF" }}
            >
              <RefreshIcon />
            </IconButton>
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

          {/* Data Grid */}
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
                paginationModel={{ pageSize: 10, page: 0 }}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#6A4BBC",
                    color: "#ffffff",
                  },
                  "& .MuiDataGrid-row": {
                    "&:nth-of-type(odd)": { backgroundColor: "#F8F8FC" },
                  },
                }}
              />
            )}
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{ textAlign: "center", mt: 2 }}
              >
                {error.message}
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
