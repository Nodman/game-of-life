import React, {useEffect , useReducer} from 'react';
import Grid from '../grid';
import {createGrid, calculateNextGeneration, spawnRandomCells} from '../../utils';

const GRID_SIZE = 50;
const CELL_TO_SPAWN = 300;
const GRID = createGrid(GRID_SIZE);
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
  const [currentCycleState, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect((): void => {
    setInterval(() => {
      dispatch({type: 'TICK'});
    }, 100);
  }, []);

  return <Grid grid={GRID} currentCycle={currentCycleState} />;
};

export default Root;
