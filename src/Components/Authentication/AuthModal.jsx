import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  // p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setAlert } = CryptoState();

  const goolgeProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, goolgeProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Signup SuccessFull.Welcome ${res.user.email}`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{
                backgroundColor: "transparent",
                color: "white",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                indicatorColor="secondary"
                style={{ borderRadius: 10 }}
              >
                <Tab label="Login" sx={{ width: "50%" }} />
                <Tab label="Sign Up" sx={{ width: "50%" }} />
              </Tabs>
            </AppBar>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}

            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                padding: "24px",
                paddingTop: 0,
                fontSize: 20,
              }}
            >
              <span
                style={{
                  color: "white",
                }}
              >
                OR
              </span>
              <GoogleButton
                style={{
                  width: "100%",
                  outline: "none",
                }}
                onClick={signInWithGoogle}
              ></GoogleButton>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
