import { expect, describe, it } from "bun:test"
import { part1, part2 } from "./day_01"

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

  describe("Part 2", () => {
    describe("zero tracking", () => {
      it("another test example", async () => {
        const result = part2("R1000")
        expect(result.zeroes).toEqual(10)
        expect(result.location).toEqual(50)
      })

      it("if you land on exactly zero", async () => {
        const result = part2("R50")
        expect(result.zeroes).toEqual(1)
        expect(result.location).toEqual(0)
      })

      it("if you go down to 0", async () => {
        const result = part2("L50")
        expect(result.zeroes).toEqual(1)
        expect(result.location).toEqual(0)
      })

      it("if you pass 0 and also land on 0", async () => {
        const result = part2("R150")
        expect(result.zeroes).toEqual(2)
        expect(result.location).toEqual(0)
      })

      it("if you land on 0 and then keep moving", async () => {
        const result = part2("L50\nL2")
        expect(result.zeroes).toEqual(1)
        expect(result.location).toEqual(98)
      })
    })

    describe("test input", () => {
      const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

      it("works", async () => {
        expect(part2(input).zeroes).toEqual(6)
      })
    })
  })
})
