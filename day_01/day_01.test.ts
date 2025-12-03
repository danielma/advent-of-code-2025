import { expect, describe, it } from "bun:test"
import { part1 } from "./day_01"

describe("Day 1", () => {
  describe("Part 1", () => {
    describe("simple instructions", () => {
      it("can turn left a couple", async () => {
        expect(part1("L3").location).toEqual(47)
      })

      it("can turn right a couple", async () => {
        expect(part1("R16").location).toEqual(66)
      })

      it("a specific example", async () => {
        expect(part1("S5\nL10").location).toEqual(95)
      })

      it("can turn to 0", async () => {
        expect(part1("L50").location).toEqual(0)
      })

      it("can turn right past 0", async () => {
        expect(part1("S99\nR1").location).toEqual(0)
      })

      it("can turn left past 0", async () => {
        expect(part1("L99").location).toEqual(51)
      })
    })

    describe("zero tracking", () => {
      it("initial state", async () => {
        expect(part1("S2").zeroes).toEqual(0)
      })

      it("hits 0", async () => {
        expect(part1("L50").zeroes).toEqual(1)
      })
    })

    describe("Example input", () => {
      const input = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`

      it("returns the right password", async () => {
        expect(part1(input).zeroes).toEqual(3)
      })
    })
  })
})
