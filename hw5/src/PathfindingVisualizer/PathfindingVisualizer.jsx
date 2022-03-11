import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

import "./PathfindingVisualizer.css";

let START_NODE_ROW = 0;
let START_NODE_COL = 0;
let FINISH_NODE_ROW = 19;
let FINISH_NODE_COL = 49;

const PathfindingVisualizer = () => {
  const [snode_row, setSnode_row] = useState(0);
  const [snode_col, setSnode_col] = useState(0);
  const [fnode_row, setFnode_row] = useState(19);
  const [fnode_col, setFnode_col] = useState(49);
  
  useEffect(() => {
    console.log(START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
  }, [snode_row, snode_col, fnode_row, fnode_col]);
  // BEGIN PART 5

  // YOUR CODE HERE
  const [grid, setGrid] = useState(getInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };
  // END PART 5

  // BEGIN PART 6

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      // YOUR CODE HERE
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      // YOUR CODE HERE
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const updateStartAndEnd = () => {
    setSnode_row(parseInt(document.getElementById("start_row").value));
    setSnode_col(parseInt(document.getElementById("start_col").value));
    setFnode_row(parseInt(document.getElementById("finish_row").value));
    setFnode_col(parseInt(document.getElementById("finish_col").value));
    removeGridStartEnd(grid, START_NODE_ROW, START_NODE_COL, FINISH_NODE_ROW, FINISH_NODE_COL);
    START_NODE_ROW = snode_row;
    START_NODE_COL = snode_col;
    FINISH_NODE_ROW = fnode_row;
    FINISH_NODE_COL = fnode_col;
    updateGridStartEnd(grid, snode_row, snode_col, fnode_row, fnode_col);
  };

  return (
    <>
      <form>
        <label>
          Start Row:
          <input type="text" id="start_row" />
        </label>
        <label>
          Start Col:
          <input type="text" id="start_col" />
        </label>
        <label>
          Finish Row:
          <input type="text" id="finish_row" />
        </label>
        <label>
          Finish Col:
          <input type="text" id="finish_col" />
        </label>
      </form>
      <button onClick={() => updateStartAndEnd()}>
        Update Start and End
      </button>
      <button onClick={() => visualizeDijkstra()}>
        Visualize Dijkstra's Algorithm
      </button>
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

// END PART 6

// BEGIN PART 4

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

// YOUR ANSWER HERE
// This helper function initializes a 20 by 50 grid.

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

// YOUR ANSWER HERE
// This helper function creates a Node instance with different variables.

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice(); // Creates a shallow copy
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

// YOUR ANSWER HERE
// This helper function toggles a node's isWall variable to be the opposite of what it was.
// END PART 4

const updateGridStartEnd = (grid, srow, scol, frow, fcol) => {
  const newGrid = grid.slice(); // Creates a shallow copy
  const snode = newGrid[srow][scol];
  const newSNode = {
    ...snode,
    isStart: true,
    isFinish: false,
  };
  newGrid[srow][scol] = newSNode;

  const fnode = newGrid[frow][fcol];
  const newFNode = {
    ...fnode,
    isStart: false,
    isFinish: true,
  };
  newGrid[frow][fcol] = newFNode;
  return newGrid;
}

const removeGridStartEnd = (grid, srow, scol, frow, fcol) => {
  const newGrid = grid.slice(); // Creates a shallow copy
  const snode = newGrid[srow][scol];
  const newSNode = {
    ...snode,
    isStart: false,
    isFinish: false,
  };
  newGrid[srow][scol] = newSNode;

  const fnode = newGrid[frow][fcol];
  const newFNode = {
    ...fnode,
    isStart: false,
    isFinish: false,
  };
  newGrid[frow][fcol] = newFNode;
  return newGrid;
}

export default PathfindingVisualizer;
