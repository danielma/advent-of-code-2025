import { describe, it, expect } from "bun:test"
import { part1 } from "./day_03"

describe("Day 3", () => {
  describe("part 1", () => {
    it("gets the right answer for 11111", async () => {
      expect(part1("11111")).toEqual({ joltages: [11], total: 11 })
    })

    describe("a single bank", () => {
      const subject = (input: string) => part1(input).joltages[0]

      it("12345", async () => {
        expect(subject("12345")).toEqual(45)
      })

      it("748387", async () => {
        expect(subject("748387")).toEqual(88)
      })

      it("some test inputs", async () => {
        expect(subject("987654321111111")).toEqual(98)
        expect(subject("811111111111119")).toEqual(89)
        expect(subject("234234234234278")).toEqual(78)
        expect(subject("818181911112111")).toEqual(92)
      })
    })

    describe("lists of banks", () => {
      it("works with test inputs", async () => {
        const testInput = `
987654321111111
811111111111119
234234234234278
818181911112111
`

        expect(part1(testInput)).toEqual({
          joltages: [98, 89, 78, 92],
          total: 357,
        })
      })
    })
  })
})
