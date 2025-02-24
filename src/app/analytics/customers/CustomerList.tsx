"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Box,
  TextField,
  Paper,
  Container,
  CircularProgress,
  Chip,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { GET_CUSTOMERS } from "../../../graphql/customer/query/customers";
import { useQuery } from "@apollo/client";
import getApolloClient from "../../../lib/apolloClient";
import { useRouter } from "next/navigation";
import { DELETE_CUSTOMER_BY_ID } from "../../../graphql/customer/mutation/delete";
import { useMutation } from "@apollo/client";
import Link from "next/link";

// 🌟 Tier Level Mapping
const tierLevels = {
  "1": { label: "🥉 Basic", color: "#CD7F32" },
  "2": { label: "🥈 Elite", color: "#C0C0C0" },
  "3": { label: "🥇 Supreme", color: "#FFD700" },
};

// 🛠 Status-Farben Mapping
const statusColors = {
  ACTIVE: { label: "Aktiv", color: "success" },
  BLOCKED: { label: "Blockiert", color: "error" },
  INACTIVE: { label: "Inaktiv", color: "warning" },
  CLOSED: { label: "Geschlossen", color: "default" },
  PENDING: { label: "Ausstehend", color: "info" },
  SUSPENDED: { label: "Suspendiert", color: "secondary" },
};

export default function CustomerList({ initialData, token }) {
  const router = useRouter();
  const [customers, setCustomers] = useState(initialData || []); // Initiale Kunden-Daten setzen
  const [search, setSearch] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const client = token ? getApolloClient(token) : getApolloClient(undefined);

  // Abfrage der Kunden mit Suchfilter
  const {
    loading: queryLoading,
    data: queryData,
    refetch,
  } = useQuery(GET_CUSTOMERS, {
    client,
    variables: {
      filter: [{ field: "username", operator: "LIKE", value: search }],
    },
  });

  // Mutation zum Löschen eines Kunden
  const [deleteCustomerMutation] = useMutation(DELETE_CUSTOMER_BY_ID, {
    client,
  });

  useEffect(() => {
    if (queryData?.customers) {
      setCustomers(queryData.customers);
    }
  }, [queryData]);

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    { field: "username", headerName: "Benutzername", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "tierLevel",
      headerName: "Rang",
      width: 200,
      renderCell: (params) => {
        const tier = tierLevels[params.value] || {
          label: "Unbekannt",
          color: "#ddd",
        };
        return (
          <Chip
            label={tier.label}
            variant="outlined"
            sx={{
              //backgroundColor: tier.color,
              color: tier.color,
              fontWeight: "bold",
              px: 2,
              borderColor: tier.color,
            }}
          />
        );
      },
    },
    {
      field: "customerState",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        const status = statusColors[params.value] || {
          label: params.value,
          color: "default",
        };
        return (
          <Chip
            label={status.label}
            color={status.color}
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Aktionen",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Anzeigen">
            <IconButton
              onClick={() => handleInspect(params.id)}
              sx={{ color: "#4E3792" }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bearbeiten">
            <IconButton
              onClick={() => handleEdit(params.id)}
              sx={{ color: "#FFA500" }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Löschen">
            <IconButton
              onClick={() => {
                handleDelete(params.id, params.row.version);
              }}
              sx={{ color: "#D32F2F" }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleEdit = (id) => router.push(`/analytics/customers/${id}/edit`);
  const handleInspect = (id) => router.push(`/analytics/customers/${id}`);
  const handleDelete = async (id, version) => {
    try {
      await deleteCustomerMutation({ variables: { id, version } });
      // Nach dem Löschen die Liste neu laden
      await refetch();
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 3,
        py: 2,
        mt: 2,
        backgroundColor: "#f0f0f0",
        overflow: "auto",
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
            startIcon={<Add />}
          >
            <Link href={"/analytics/customers/create"}>Neuer Kunde</Link>
          </Button>
        </Paper>

        <Paper
          sx={{
            //height: 450,
            width: "100%",
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "#f0f0f0",
          }}
        >
          {queryLoading ? (
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
              rows={customers || []}
              columns={columns}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50]} // Optionen für Seitengröße
              slots={{ toolbar: GridToolbar }}
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
  );
}
