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
  Avatar,
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
    skip: !client,
    variables: {
      filter: [{ field: "username", operator: "LIKE", value: search }],
      pagination: { limit: 10, offset: 0 },
      order: { field: "lastName", direction: "ASC" },
    },
  });

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "photo",
      headerName: "Foto",
      width: 80,
      renderCell: (params) => (
        <Avatar
          alt="Kundenbild"
          src={params.value}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "lastName", headerName: "Nachname", width: 180 },
    { field: "username", headerName: "Benutzername", width: 200 },
    { field: "contactOptions", headerName: "Kontakt", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.value === "Active" ? "#388E3C" : "#D32F2F",
            backgroundColor: params.value === "Active" ? "#A3E635" : "#F87171",
            padding: "5px 10px",
            borderRadius: "15px",
            fontSize: "0.9rem",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Aktionen",
      width: 180,
      renderCell: () => (
        <Box>
          <IconButton color="primary">
            <RefreshIcon />
          </IconButton>
          <IconButton color="secondary">
            <AddIcon />
          </IconButton>
        </Box>
      ),
    },
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
    <Box sx={{ display: "flex", height: "100vh" }}>
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
          <ListItem button component={Link} href="/">
            <ListItemIcon sx={{ color: "#fff" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
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
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Kundenübersicht
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="User Avatar"
                src="/user.png"
                sx={{ marginRight: 2 }}
              />
              <Typography variant="body1">Luke Asote</Typography>
            </Box>
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
              sx={{
                color: "#00FFFF",
                "&:hover": { color: "#6A4BBC" },
              }}
              onClick={() => refetch()}
            >
              <SearchIcon />
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
            sx={{ height: 500, width: "100%", borderRadius: 2, boxShadow: 2 }}
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
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#6A4BBC",
                    color: "#ffffff",
                  },
                  "& .MuiDataGrid-row:nth-of-type(odd)": {
                    backgroundColor: "#F8F8FC",
                  },
                }}
              />
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
