import { describe, expect, it } from "bun:test"
import { part1 } from "./day_02"

describe("Day 2", () => {
  describe("part 1", () => {
    describe("invalids", () => {
      const subject = (...input: Parameters<typeof part1>) =>
        part1(...input).invalids

      it("an exact match", async () => {
        expect(subject("11")).toEqual([11])
      })

      it("a valid number", async () => {
        expect(subject("12")).toEqual([])
      })

      it("a simple range", async () => {
        expect(subject("11-22")).toEqual([11, 22])
      })

      it("a two-pair number", async () => {
        expect(subject("3434")).toEqual([3434])
      })

      it("a triplet", async () => {
        expect(subject("159159")).toEqual([159159])
      })

      it("comma-separated ranges", async () => {
        expect(subject("11-22,95-115")).toEqual([11, 22, 99])
      })
    })

    it("the instruction input", async () => {
      const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`

      const result = part1(input)

      expect(result.invalids).toEqual([
        11, 22, 99, 1010, 1188511885, 222222, 446446, 38593859,
      ])
      expect(result.total).toEqual(1227775554)
    })
  })
})
