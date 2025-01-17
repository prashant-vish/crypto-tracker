import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  createTheme,
  LinearProgress,
  Pagination,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Coursel";

const CoinsTable = () => {
  const [search, setSearch] = useState();
  const [page, setPage] = useState(1);
  const tableHead = ["Coin", "Price", "24h Change", "MarketCap"];
  const navigate = useNavigate();
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const handleSearch = () => {
    if (!search) {
      return coins;
    }
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  // console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            style={{ margin: 18, fontFamily: "Montserrat" }}
          >
            Crypto Prices By Market Cap!!
          </Typography>
          <TextField
            variant="outlined"
            label="Search for Crypto Currency.."
            style={{
              marginBottom: 20,
              width: "100%",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></TextField>
          <TableContainer>
            {loading ? (
              <LinearProgress
                style={{ backgroundColor: "gold" }}
              ></LinearProgress>
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#eebc1d" }}>
                  <TableRow>
                    {tableHead.map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontFamily: "Montserrat",
                          fontWeight: "700",
                        }}
                        key={head}
                        align={head === "Coin" ? "left" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch()
                    .slice(page * 10 - 10, page * 10)
                    .map((row) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          key={row.id}
                          onClick={() => {
                            navigate(`/coinpage/${row.id}`);
                            key: {
                              row.name;
                            }
                          }}
                          sx={{
                            backgroundColor: "#16171a",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#131111",
                            },
                            fontFamily: "Montserrat",
                          }}
                        >
                          <TableCell
                            component={"th"}
                            scope="row"
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 15,
                            }}
                          >
                            <img
                              src={row?.image}
                              alt={row?.symbol}
                              height={50}
                              marginBottom={15}
                            ></img>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </span>
                              <span
                                style={{
                                  color: "darkgrey",
                                }}
                              >
                                {row.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            {symbol + " "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontWeight: 500,
                            }}
                          >
                            {symbol + " "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            variant="outlined"
            style={{
              padding: 10,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "gold", // Change the text color to gold
                fontWeight: "bold", // Optional for better visibility
                margin: "14px 8px",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "gold", // Highlight the selected item
                color: "black", // Text color of the selected item
              },
            }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CoinsTable;
