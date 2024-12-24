import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CryptoState } from "../CryptoContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  console.log(currency);

  function handleChange(e) {
    setCurrency(e.target.value);
  }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="primary" position="static">
          <Container>
            <Toolbar>
              <Typography
                variant="h5"
                sx={{
                  flex: 1,
                  color: "gold", // Apply gold color
                  fontFamily: "Montserrat", // Apply Montserrat font family
                  fontWeight: "bold", // Apply bold font weight
                  cursor: "pointer", // Apply pointer cursor
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Crypto Tracker
              </Typography>

              <Select
                variant="outlined"
                style={{ height: 40, width: 100 }}
                value={currency}
                onChange={handleChange}
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
