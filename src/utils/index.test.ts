import * as utils from './';

const STUB_SIZE = 10;

test('Creates grid of proper size and content', () => {
  const grid = utils.createGrid(STUB_SIZE);
  expect(grid.length).toEqual(STUB_SIZE);
  expect(grid.every((row) => row.length === STUB_SIZE)).toBeTruthy();
  expect(grid[0][0]).toEqual(0);
});

test('Spawns right amount of cells', () => {
  const cells = utils.spawnRandomCells(STUB_SIZE, STUB_SIZE);
  expect(cells.size).toEqual(STUB_SIZE);
  expect(Array.from(cells).every((cell) => cell)).toBeTruthy();
});

test('Converts from string to array of numbers', () => {
  expect(utils.pointFromString('1.1')).toEqual([1, 1]);
});

test('Gererates valid coordinates', () => {
  const MIN = 42;
  const MAX = 322;
  const [x, y] = utils.pointFromString(utils.getRandomPoint(MIN, MAX));
  expect(x).toBeGreaterThanOrEqual(MIN);
  expect(x).toBeLessThan(MAX);
  expect(y).toBeGreaterThanOrEqual(MIN);
  expect(y).toBeLessThan(MAX);
});

test('Finds valid neighbours', () => {
  const SIZE = 3;
  const CELL = '1.1';
  const STUB_NEIGHBOURS = ['0.0', '0.1', '0.2', '1.0', '1.2', '2.0', '2.1', '2.2'];

  const neighbours = utils.getNeighbours(CELL, SIZE);
  expect(neighbours).toEqual(STUB_NEIGHBOURS);
});

test('Calculates neighbours sum correctly', () => {
  const SIZE = 3;
  const CELLS: CellsSet = new Set();
  CELLS.add('0.1');
  CELLS.add('1.1');
  CELLS.add('2.2');

  const sum = utils.calcNeighboursSum(utils.getNeighbours('1.1', SIZE), CELLS);
  expect(sum).toEqual(2);
});

test('Calculates next generation properly', () => {
  const SIZE = 5;
  const CELLS: CellsSet = new Set();
  CELLS.add('1.2');
  CELLS.add('2.2');
  CELLS.add('3.2');
  const nextGeneration = utils.calculateNextGeneration(CELLS, SIZE);
  expect(nextGeneration.has('2.1')).toBeTruthy();
  expect(nextGeneration.has('2.2')).toBeTruthy();
  expect(nextGeneration.has('2.3')).toBeTruthy();
  expect(nextGeneration.size).toEqual(3);
});
