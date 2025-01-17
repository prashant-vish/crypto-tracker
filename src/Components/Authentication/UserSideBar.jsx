import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../CryptoContext";
import { Avatar, Box } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Banner/Coursel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSideBar() {
  const [state, setState] = React.useState({
    right: false,
  });

  const style = {
    container: {
      width: 350,
      padding: 25,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: "monospace",
    },
    profile: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      height: "92%",
    },
  };
  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logged Out Successfully",
    });
    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed to the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div style={style.container}>
              <div style={style.profile}>
                <Avatar
                  sx={{
                    width: "200px",
                    height: "200px",
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                    objectFit: "contain",
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    backgroundColor: "grey",
                    borderRadius: "10px",
                    padding: "15px",
                    paddingTop: "10px",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                    overflowY: "scroll",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      textShadow: "0 0 25px black",
                    }}
                  >
                    WatchList
                  </span>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <Box
                          sx={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "black",
                            backgroundColor: "#eebc1d",
                            boxShadow: "0 0 3px black",
                          }}
                        >
                          <span>{coin.name}</span> &nbsp;
                          <span style={{ display: "flex", gap: "8px" }}>
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{
                                cursor: "pointer",
                              }}
                              fontSize={"16px"}
                              onClick={() => {
                                removeFromWatchlist(coin);
                              }}
                            ></AiFillDelete>
                          </span>
                        </Box>
                      );
                  })}
                </Box>
              </div>
              <Button
                variant="contained"
                sx={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1d",
                  marginTop: "20px",
                }}
                size="large"
                onClick={logOut}
              >
                <span fontWeight="bold">Log out</span>
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
