import React from 'react';
import Cell from '../cell';

type PropTypes = {
  grid: Grid,
  currentCycle: CellsSet,
};

const Grid = ({grid, currentCycle}: PropTypes) => {
  return (
    <div className="container">
      <table className="grid">
        <tbody>
          {grid.map((row, x) => (
            <tr key={`row-${x}`}>
              {row.map((_, y) => (
                <Cell key={`cel-${y}`} alive={currentCycle.has(`${x}.${y}`)}/>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grid;
