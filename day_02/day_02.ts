function checkForRepeatingSequence(input: string, parts: number) {
  if (input.length % parts === 0) {
    const firstPart = input.substring(0, input.length / parts)

    return firstPart.repeat(parts) === input
  } else {
    return false
  }
}

function* range(startAt: number, endAt: number) {
  for (let i = startAt; i <= endAt; i++) {
    yield i
  }
}

function processRange(
  input: string,
  doWeCareAboutThisNumber: (input: string) => boolean
) {
  const [rawStartAt = "", rawEndAt = rawStartAt] = input.split("-")

  const startAt = parseInt(rawStartAt, 10)
  const endAt = parseInt(rawEndAt, 10)

  return range(startAt, endAt).reduce(
    (acc, element) =>
      doWeCareAboutThisNumber(element.toString()) ? [...acc, element] : acc,
    [] as number[]
  )
}

function sum(numbers: number[]) {
  return numbers.reduce((acc, el) => acc + el, 0)
}

function processInput(
  input: string,
  isNumberInvalid: (input: string) => boolean
) {
  const invalids = input
    .split(",")
    .reduce(
      (acc, elem) => acc.concat(processRange(elem, isNumberInvalid)),
      [] as number[]
    )
  return { invalids, total: sum(invalids) }
}

export function part1(input: string) {
  return processInput(input, (sequence) =>
    checkForRepeatingSequence(sequence, 2)
  )
}

export function part2(input: string) {
  return processInput(input, (sequence) =>
    range(2, sequence.length).some((count) =>
      checkForRepeatingSequence(sequence, count)
    )
  )
}
