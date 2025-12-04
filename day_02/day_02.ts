function isRepeatingSequence(input: string) {
  if (input.length % 2 === 0) {
    const firstHalf = input.substring(0, input.length / 2)

    return firstHalf.repeat(2) === input
  } else {
    return false
  }
}

function* range(startAt: number, endAt: number) {
  for (let i = startAt; i <= endAt; i++) {
    yield i
  }
}

function processRange(input: string) {
  const [rawStartAt = "", rawEndAt = rawStartAt] = input.split("-")

  const startAt = parseInt(rawStartAt, 10)
  const endAt = parseInt(rawEndAt, 10)

  return range(startAt, endAt).reduce(
    (acc, element) =>
      isRepeatingSequence(element.toString()) ? [...acc, element] : acc,
    [] as number[]
  )
}

function sum(numbers: number[]) {
  return numbers.reduce((acc, el) => acc + el, 0)
}

export function part1(input: string) {
  const invalids = input
    .split(",")
    .reduce((acc, elem) => acc.concat(processRange(elem)), [] as number[])
  return { invalids, total: sum(invalids) }
}
