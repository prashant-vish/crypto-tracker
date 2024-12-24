import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { green, red } from "@mui/material/colors";
import { capitalize } from "@mui/material";

export const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Coursel = () => {
  const [trending, setTrending] = useState([]);

  const { currency, symbol } = CryptoState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  // console.log(trending);

  const responsiveObj = {
    0: {
      items: 2,
    },
    650: {
      items: 3,
    },
    720: {
      items: 4,
    },
  };

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h > 0;
    return (
      <Link
        to={`/coinpage/${coin.id}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textTransform: "uppercase",
          cursor: "pointer",
          color: "white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height={80}
          style={{ marginBottom: 10 }}
        ></img>
        <span>
          {coin?.symbol}
          &nbsp;&nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  return (
    <div style={{ display: "flex", height: "50%", alignItems: "center" }}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={2000}
        disableDotsControls
        autoPlay
        responsive={responsiveObj}
        items={items}
        disableButtonsControls
      ></AliceCarousel>
    </div>
  );
};

export default Coursel;
