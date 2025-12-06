const ROLL = "@"
const EMPTY = "."

type Point = { x: number; y: number }
type Grid = { grid: string[][]; size: { x: number; y: number } }

function generatePointsToCheck(
  x: number,
  y: number,
  { size }: { size: { x: number; y: number } }
) {
  const north = y - 1
  const south = y + 1
  const east = x + 1
  const west = x - 1

  const northIsValid = north >= 0
  const southIsValid = south < size.y
  const eastIsValid = east < size.x
  const westIsValid = west >= 0

  const points: Point[] = []

  if (northIsValid && westIsValid) points.push({ x: west, y: north })
  if (northIsValid) points.push({ x, y: north })
  if (northIsValid && eastIsValid) points.push({ x: east, y: north })

  if (westIsValid) points.push({ x: west, y })
  if (eastIsValid) points.push({ x: east, y })

  if (southIsValid && westIsValid) points.push({ x: west, y: south })
  if (southIsValid) points.push({ x, y: south })
  if (southIsValid && eastIsValid) points.push({ x: east, y: south })

  return points
}

function makeGrid(input: string): Grid {
  const trimmed = input.trim()

  const grid = trimmed.split("\n").map((line) => line.split(""))
  const size = { x: grid[0]!.length, y: grid.length }

  return { grid, size }
}

function gridAt(grid: Grid["grid"], { x, y }: Point) {
  return grid[y]![x]!
}

function gridWrite(grid: Grid["grid"], { x, y }: Point, value: string) {
  grid[y]![x] = value
}

function* walkGrid(grid: Grid["grid"]) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      yield { char: grid[y]![x]!, x, y }
    }
  }
}

function removableRolls(grid: Grid) {
  const rollLocations: Point[] = []

  for (let { char, x, y } of walkGrid(grid.grid)) {
    if (char === EMPTY) {
      continue
    } else {
      const points = generatePointsToCheck(x, y, { size: grid.size })

      const pointsWithRoll = points
        .map((p) => gridAt(grid.grid, p))
        .filter((c) => c === ROLL).length

      if (pointsWithRoll < 4) rollLocations.push({ x, y })
    }
  }

  return { rollLocations, total: rollLocations.length }
}

export function part1(input: string) {
  const grid = makeGrid(input)

  return removableRolls(grid)
}

export function part2(input: string) {
  const grid = makeGrid(input)

  let total = 0
  let removable = removableRolls(grid)

  while (removable.total > 0) {
    total += removable.total

    removable.rollLocations.forEach((p) => {
      gridWrite(grid.grid, p, EMPTY)
    })

    removable = removableRolls(grid)
  }

  return total
}
