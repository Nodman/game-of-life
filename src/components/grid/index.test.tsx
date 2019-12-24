import React from 'react';
import {render} from '@testing-library/react';

import Grid from './';

const STUB_GRID = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const STUB_SYCLE: CellsSet = new Set();
STUB_SYCLE.add('1.1');
STUB_SYCLE.add('2.2');

test('Renders Grid properly', () => {
  const {container} = render(<Grid grid={STUB_GRID} currentCycle={STUB_SYCLE}/>);
  const tbody = container.querySelector('tbody');
  expect(tbody).not.toBeNull();
  expect(tbody.querySelectorAll('tr').length).toEqual(STUB_GRID.length);
  expect(tbody.querySelectorAll('td').length).toEqual(Math.pow(STUB_GRID.length, 2));
});
