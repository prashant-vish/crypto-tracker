import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "../Components/CoinInfo";
import { Box, LinearProgress, Typography } from "@mui/material";
import { numberWithCommas } from "../Components/Banner/Coursel";
const CoinPage = () => {
  const { id } = useParams();

  const [coin, setCoins] = useState();

  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoins(data);
  };
  console.log(coin);
  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin)
    return (
      <LinearProgress style={{ backgroundColor: "gold" }}></LinearProgress>
    );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { lg: "row", md: "coloum", xs: "column" }, // t
        alignItems: { lg: "flex-start", md: "center", xs: "center" },
      }}
    >
      <Box
        sx={{
          width: { lg: "33%", md: "100%", xs: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 5,
          borderRight: { lg: "2px solid grey" },
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height={200}
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            fontFamily: "Montserrat",
            marginBottom: 20,
          }}
        >
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            width: "100%",
            fontSize: 18,
            fontFamily: "Montserrat",
            fontWeight: 600,
            padding: "40px 40px",
            textAlign: "justify",
            // alignItems: "center",
          }}
        >
          {coin?.description.en.split(".")[0] + "."}
        </Typography>
        <Box
          sx={{
            alignSelf: "start",
            padding: "40px 40px",
            paddingTop: 2,
            width: "100%",
            display: { lg: "flex", md: "flex", sm: "flex", xs: "block" },
            flexDirection: { lg: "column", md: "row", xs: "column" },
            justifyContent: { md: "space-around" },
            alignItems: { lg: "start", sm: "center", xs: "start" },
            gap: 2,
          }}
        >
          <span style={{ display: "flex" }}>
            <Typography variant="h4" style={{ fontWeight: 700 }}>
              Rank:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h4" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h4" style={{ fontWeight: 700 }}>
              Current Price:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h4" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h4" style={{ fontWeight: 700 }}>
              Market Cap:
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h4" style={{ fontFamily: "Montserrat" }}>
              {symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </Box>
      </Box>
      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;
