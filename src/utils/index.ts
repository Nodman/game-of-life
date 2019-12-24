// create empty grid for render purpose
export const createGrid = (size: number): Grid => {
  return Array.from(Array(size), (_) => Array(size).fill(0));
};

// random int number
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// '1.1' => [1, 1]
export const pointFromString = (str: string): number[] => str.split('.').map((value) => parseInt(value, 10));

// get random coordinates point
export const getRandomPoint = (min: number, max: number): string => {
  const x = getRandomInt(min, max);
  const y = getRandomInt(min, max);

  return `${x}.${y}`;
};

// build Set of random Points
export const spawnRandomCells = (size: number, amount: number): CellsSet => {
  const aliveCells: CellsSet = new Set();

  for (let i = 0; i < amount; i++) {
    let point = getRandomPoint(0, size);
    while (aliveCells.has(point)) {
      point = getRandomPoint(0, size);
    }
    aliveCells.add(point);
  }
  return aliveCells;
};

// get all naighbours
export const getNeighbours = (point: string, size: number) => {
  const [x, y] = pointFromString(point);
  const top = x - 1 < 0 ? (size - 1) : x - 1;
  const bottom = (x + 1 === size) ? 0 : x + 1;
  const left = y - 1 < 0 ? (size - 1) : y - 1;
  const right = (y + 1 === size) ? 0 : y + 1;

  return [
    `${top}.${left}`,
    `${top}.${y}`,
    `${top}.${right}`,
    `${x}.${left}`,
    `${x}.${right}`,
    `${bottom}.${left}`,
    `${bottom}.${y}`,
    `${bottom}.${right}`,
  ];
};

// get sum of all neighbours
export const calcNeighboursSum = (neighbours: string[], aliveCells: CellsSet): number => {
  return neighbours.reduce((sum, point) => {
    const state = aliveCells.has(point) ? 1 : 0;
    return sum + state;
  }, 0);
};

// calculate next generation of cells
export const calculateNextGeneration = (aliveCells: CellsSet, size: number): CellsSet => {
  const pretenders: CellsSet = new Set();
  const nextGeneration: CellsSet = new Set();

  // iterate over currently alive cells
  aliveCells.forEach((point) => {
    const neighbours = getNeighbours(point, size);
    const neighboursSum = calcNeighboursSum(neighbours, aliveCells);
    if (neighboursSum < 4 && neighboursSum >= 2) {
      nextGeneration.add(point);
    }
    neighbours.forEach((neighbourPoint) => {
      pretenders.add(neighbourPoint);
    });
  });

  // cells that have chance to born on the next generation
  pretenders.forEach((point) => {
    const neighbours = getNeighbours(point, size);
    const neighboursSum = calcNeighboursSum(neighbours, aliveCells);
    if (neighboursSum === 3) {
      nextGeneration.add(point);
    }
  });

  return nextGeneration;
};
