import { color } from "chart.js/helpers";
import React from "react";
import "./../../src/index.css";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <span className={`button ${selected ? "selected" : ""}`} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
