import React, {useEffect, useState, useReducer} from 'react';
import Grid from '../grid';
import {createGrid, calculateNextGeneration, spawnRandomCells} from '../../utils';

const GRID_SIZE = 50;
const CELL_TO_SPAWN = 300;
const INITIAL_STATE = spawnRandomCells(GRID_SIZE, CELL_TO_SPAWN);

const reducer = (state: CellsSet, action: {type: string}) => {
  switch (action.type) {
    case 'TICK':
      return calculateNextGeneration(state, GRID_SIZE);
    default:
      return state;
  }
};

const Root = () => {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [currentCycleState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect((): void => {
    const newGrid = createGrid(GRID_SIZE);
    setGrid(newGrid);

    setInterval(() => {
      dispatch({type: 'TICK'});
    }, 100);
  }, []);

  return grid ? <Grid grid={grid} currentCycle={currentCycleState} /> : null;
};

export default Root;
