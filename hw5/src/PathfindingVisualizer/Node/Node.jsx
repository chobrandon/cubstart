import React from "react";

import "./Node.css";

// BEGIN PART 3

const Node = (/* YOUR CODE HERE */{
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
}) => {
  // YOUR CODE HERE
  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : "";
  return <div /* YOUR CODE HERE */id={`node-${row}-${col}`}
  className={`node ${extraClassName}`}
  onMouseDown={() => onMouseDown(row, col)}
  onMouseEnter={() => onMouseEnter(row, col)}
  onMouseUp={() => onMouseUp()}
  ></div>;
};

// END PART 3

export default Node;
