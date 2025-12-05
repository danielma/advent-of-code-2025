function joltageForBank(bank: string) {
  let theFirstDigit = { number: 0, index: 0 }
  let theSecondDigit = { number: 0, index: 0 }

  for (let [index, digit] of bank
    .substring(0, bank.length - 1)
    .split("")
    .entries()) {
    const number = parseInt(digit, 10)

    if (number > theFirstDigit.number) {
      theFirstDigit = { number, index }
    }
  }

  for (let [index, digit] of bank
    .substring(theFirstDigit.index + 1)
    .split("")
    .entries()) {
    const number = parseInt(digit, 10)

    if (number > theSecondDigit.number) {
      theSecondDigit = { number, index: index + theFirstDigit.index }
    }
  }

  return theFirstDigit.number * 10 + theSecondDigit.number
}

export function part1(input: string) {
  const joltages = input.split("\n").filter(Boolean).map(joltageForBank)

  return {
    joltages,
    total: sum(joltages),
  }
}

function sum(numbers: number[]) {
  return numbers.reduce((acc, num) => acc + num, 0)
}
