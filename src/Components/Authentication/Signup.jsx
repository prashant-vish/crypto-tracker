import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { CryptoState } from "../../CryptoContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confrmpassword, setConfrmPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    if (password !== confrmpassword) {
      setAlert({
        open: true,
        message: "Password Do not Match",
        type: "error",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${result.user.email}`,
        type: "success",
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        fullWidth
      ></TextField>
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={confrmpassword}
        onChange={(e) => {
          setConfrmPassword(e.target.value);
        }}
        fullWidth
      ></TextField>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        fullWidth
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
