const ROLL = "@"
const EMPTY = "."

type Grid = string[][]
type Point = { x: number; y: number }

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

  if (northIsValid) {
    if (westIsValid) points.push({ x: west, y: north })

    points.push({ x, y: north })

    if (eastIsValid) points.push({ x: east, y: north })
  }

  if (westIsValid) points.push({ x: west, y })
  if (eastIsValid) points.push({ x: east, y })

  if (southIsValid) {
    if (westIsValid) points.push({ x: west, y: south })

    points.push({ x, y: south })

    if (eastIsValid) points.push({ x: east, y: south })
  }

  return points
}

export function part1(input: string) {
  const trimmed = input.trim()

  const grid = trimmed.split("\n").map((line) => line.split(""))
  const gridSize = { x: grid[0]!.length, y: grid.length }
  const rollLocations: Point[] = []

  grid.forEach((row, y) =>
    row.forEach((char, x) => {
      if (char === EMPTY) {
        return
      } else {
        const points = generatePointsToCheck(x, y, { size: gridSize })

        const pointsFull = points
          .map((p) => grid[p.y]![p.x]!)
          .filter((c) => c === ROLL).length

        if (pointsFull < 4) rollLocations.push({ x, y })
      }
    })
  )

  // console.log(grid)

  return { rollLocations, total: rollLocations.length }
}
