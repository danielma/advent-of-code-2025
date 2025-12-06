import { describe, it, expect } from "bun:test"
import { part1 } from "./day_04"

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

describe("Day 4", () => {
  describe("Part 1", () => {
    describe("simple grid", () => {
      const subject = (input: string) => part1(input)

      it("the simplest grid i can think of", async () => {
        const grid = `
...
...
...
`

        expect(subject(grid)).toEqual({ rollLocations: [], total: 0 })
      })

      it("one accessible", async () => {
        const grid = `
...
.@.
...
`

        expect(subject(grid)).toEqual({
          rollLocations: [{ x: 1, y: 1 }],
          total: 1,
        })
      })

      it("all full", async () => {
        const grid = `
@@@
@@@
@@@
`

        expect(subject(grid)).toEqual({
          rollLocations: [
            { x: 0, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 2 },
            { x: 2, y: 2 },
          ],
          total: 4,
        })
      })
    })

    it("works with test input", async () => {
      expect(part1(testInput).total).toEqual(13)
    })
  })
})
