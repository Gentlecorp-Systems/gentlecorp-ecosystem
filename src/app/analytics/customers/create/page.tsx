"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import getApolloClient from "../../../../lib/apolloClient";
import { CREATE_NEW_CUSTOMER } from "../../../../graphql/customer/mutation/create";
import { VisibilityOff, Visibility } from "@mui/icons-material";

// Optionen für Auswahlfelder und Mehrfachauswahlen
const tierLevelOptions = [
  { value: 1, label: "Basic" },
  { value: 2, label: "Elite" },
  { value: 3, label: "Supreme" },
];

const genderOptions = [
  { value: "MALE", label: "Männlich" },
  { value: "FEMALE", label: "Weiblich" },
  { value: "DIVERSE", label: "Divers" },
];

const maritalStatusOptions = [
  { value: "SINGLE", label: "Ledig" },
  { value: "MARRIED", label: "Verheiratet" },
  { value: "DIVORCED", label: "Geschieden" },
  { value: "WIDOWED", label: "Verwitwet" },
];

const contactOptionsOptions = ["EMAIL", "PHONE", "LETTER", "SMS"];

const interestOptions = [
  "INVESTMENTS",
  "SAVING_AND_FINANCE",
  "CREDIT_AND_DEBT",
  "BANK_PRODUCTS_AND_SERVICES",
  "FINANCIAL_EDUCATION_AND_COUNSELING",
  "REAL_ESTATE",
  "INSURANCE",
  "SUSTAINABLE_FINANCE",
  "TECHNOLOGY_AND_INNOVATION",
  "TRAVEL",
];

/**
 * CreateCustomerPage-Komponente
 *
 * Diese Komponente stellt ein Formular zur Erstellung eines neuen Kunden bereit.
 * Es werden sämtliche erforderliche Daten (inklusive Adresse, Kontaktoptionen,
 * Interessen etc.) abgefragt, die für die Erstellung eines Kunden im GentleCorp-System
 * benötigt werden. Nach erfolgreicher Erstellung wird der Benutzer zur Detailseite des
 * neuen Kunden weitergeleitet.
 *
 * @component
 * @returns {JSX.Element} Die Benutzeroberfläche zur Erstellung eines neuen Kunden.
 */
export default function CreateCustomerPage() {
  const router = useRouter();
  const client = getApolloClient(undefined);

  // Zustände für die Kundenfelder
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [tierLevel, setTierLevel] = useState(1);
  const [subscribed, setSubscribed] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [address, setAddress] = useState({
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
  });
  const [contactOptions, setContactOptions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Mutation-Hook zur Erstellung eines neuen Kunden
  const [createCustomer, { loading, error }] = useMutation(
    CREATE_NEW_CUSTOMER,
    {
      client,
    }
  );

  /**
   * Handler für Änderungen an Adressfeldern.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - Das Änderungsereignis eines Adressfeldes.
   */
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handler für den Formular-Submit.
   * Führt die Erstellung eines neuen Kunden durch und leitet bei Erfolg zur Detailseite weiter.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Das Submit-Event des Formulars.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      tierLevel,
      subscribed,
      birthdate,
      gender,
      maritalStatus,
      address,
      contactOptions,
      interests,
    };

    try {
      const { data } = await createCustomer({
        variables: { input, password },
      });
      if (data && data.createCustomer && data.createCustomer.id) {
        router.push(`/analytics/customers/${data.createCustomer.id}`);
      }
    } catch (err) {
      console.error("Fehler bei der Erstellung:", err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", color: "#1c2b39" }}
        >
          Neuer Kunde erstellen
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <TextField
                label="Vorname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Nachname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Telefonnummer"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Benutzername"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="tier-level-label">
                  Mitgliedschaftsstufe
                </InputLabel>
                <Select
                  labelId="tier-level-label"
                  value={tierLevel}
                  label="Mitgliedschaftsstufe"
                  onChange={(e) => setTierLevel(Number(e.target.value))}
                  required
                >
                  {tierLevelOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={subscribed}
                    onChange={(e) => setSubscribed(e.target.checked)}
                  />
                }
                label="Abonniert"
              />
            </Box>
            <TextField
              label="Geburtsdatum"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="gender-label">Geschlecht</InputLabel>
                <Select
                  labelId="gender-label"
                  required
                  value={gender}
                  label="Geschlecht"
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genderOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="marital-status-label">Ehestand</InputLabel>
                <Select
                  labelId="marital-status-label"
                  value={maritalStatus}
                  label="Ehestand"
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  required
                >
                  {maritalStatusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Adresse
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 2,
                }}
              >
                <TextField
                  label="Straße"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Hausnummer"
                  name="houseNumber"
                  value={address.houseNumber}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="PLZ"
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Stadt"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Bundesland"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Land"
                  name="country"
                  value={address.country}
                  onChange={handleAddressChange}
                  fullWidth
                  required
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="contact-options-label">
                  Kontaktoptionen
                </InputLabel>
                <Select
                  labelId="contact-options-label"
                  multiple
                  required
                  value={contactOptions}
                  label="Kontaktoptionen"
                  onChange={(e) => setContactOptions(e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {contactOptionsOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="interests-label">Interessen</InputLabel>
                <Select
                  labelId="interests-label"
                  multiple
                  required
                  value={interests}
                  label="Interessen"
                  onChange={(e) => setInterests(e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {interestOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                label="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {error && (
              <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                Fehler: {error.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#6A4BBC",
                "&:hover": { backgroundColor: "#4E3792" },
              }}
            >
              Kunde erstellen
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
