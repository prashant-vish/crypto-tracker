import { BrowserRouter, Routes } from "react-router-dom";
import Header from "./Components/Header";
import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import "react-alice-carousel/lib/alice-carousel.css";

function App() {
  return (
    <BrowserRouter basename="crypto-tracker">
      <div className="classes">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/coinpage/:id" element={<CoinPage></CoinPage>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
