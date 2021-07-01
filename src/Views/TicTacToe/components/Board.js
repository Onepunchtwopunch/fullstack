import React from "react";
import Square from "./Square";
import classes from "../ticTack.module.css";

const Board = ({ squares, onClick }) => (
  <div className={classes.board}>
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
