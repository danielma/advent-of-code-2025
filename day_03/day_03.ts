const defaultDigit = { number: 0, index: -1 }

function* range(startIndex: number, endIndex: number) {
  for (let index = startIndex; index < endIndex; index++) {
    yield index
  }
}

function joltageForBank(bank: string, allowedDigits: number) {
  let previousDigit = { ...defaultDigit }

  const digits = range(0, allowedDigits).map((currentDigitIndex) => {
    const currentDigit = { ...defaultDigit }

    const startIndex = previousDigit.index + 1

    for (let [index, digit] of bank
      .substring(
        startIndex,
        bank.length - allowedDigits + currentDigitIndex + 1
      )
      .split("")
      .entries()) {
      const number = parseInt(digit, 10)

      if (number > currentDigit.number) {
        currentDigit.number = number
        currentDigit.index = index + startIndex

        if (number === 9) break
      }
    }

    previousDigit = currentDigit

    return currentDigit
  })

  return digits.reduce(
    (acc, digit, index) =>
      acc + digit.number * 10 ** (allowedDigits - index - 1),
    0
  )
}

function processBanks(input: string, getJoltage: (bank: string) => number) {
  const joltages = input.split("\n").filter(Boolean).map(getJoltage)

  return {
    joltages,
    total: sum(joltages),
  }
}

export function part1(input: string) {
  return processBanks(input, (bank) => joltageForBank(bank, 2))
}

export function part2(input: string) {
  return processBanks(input, (bank) => joltageForBank(bank, 12))
}

function sum(numbers: number[]) {
  return numbers.reduce((acc, num) => acc + num, 0)
}
