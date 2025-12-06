import { filterMap } from "../utils"

const ROLL = "@"
const EMPTY = "."

type Point = { x: number; y: number }
type Grid = string[][]

function generatePointsToCheck({
  point: { x, y },
  size,
}: {
  point: Point
  size: Point
}) {
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
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""))
}

function gridSize(grid: Grid) {
  return { x: grid[0]!.length, y: grid.length }
}

function gridAt(grid: Grid, { x, y }: Point) {
  return grid[y]![x]!
}

function gridWrite(grid: Grid, { x, y }: Point, value: string) {
  grid[y]![x] = value
}

function* walkGrid(grid: Grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y]!.length; x++) {
      yield { char: grid[y]![x]!, point: { x, y } }
    }
  }
}

function removableRolls(grid: Grid) {
  const size = gridSize(grid)

  return filterMap(walkGrid(grid), ({ char, point }) => {
    if (char === ROLL) {
      const pointsWithRoll = generatePointsToCheck({ point, size })
        .map((p) => gridAt(grid, p))
        .filter((c) => c === ROLL)

      if (pointsWithRoll.length < 4) {
        return point
      }
    }
  })
}

export function part1(input: string) {
  const grid = makeGrid(input)

  const locations = removableRolls(grid)

  return { rollLocations: locations, total: locations.length }
}

export function part2(input: string) {
  const grid = makeGrid(input)

  let total = 0
  let removable = removableRolls(grid)

  while (removable.length > 0) {
    total += removable.length

    removable.forEach((p) => {
      gridWrite(grid, p, EMPTY)
    })

    removable = removableRolls(grid)
  }

  return total
}
