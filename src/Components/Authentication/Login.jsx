import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../CryptoContext";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmit = async () => {
    console.log("hii");
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please Fill All the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
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
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        fullWidth
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
