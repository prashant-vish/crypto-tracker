import { Container, Typography } from "@mui/material";
import React from "react";
import Coursel from "./Coursel";

const Banner = () => {
  return (
    <div style={{ backgroundImage: "url('../../banner2.jpg')" }}>
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          paddingTop: 5,
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat",
              marginBottom: 25,
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Monteserrat",
            }}
          >
            Get all the info regarding your favourite Crypto Currency
          </Typography>
        </div>
        <Coursel></Coursel>
      </Container>
    </div>
  );
};

export default Banner;
